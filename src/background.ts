// learn more: https://developer.chrome.com/docs/extensions/develop/concepts/service-workers

import type { z } from "zod";
import { emails } from "@/storage/emails";
import { PresetName, presets } from "@/storage/presets";

chrome.runtime.onInstalled.addListener(async () => {
  createContextMenus(await emails.queryFn());
});

chrome.storage.onChanged.addListener(async ({ [emails.key]: emailsChange }) => {
  createContextMenus(
    emailsChange?.newValue ?
      emails.schema.parse(emailsChange.newValue)
    : await emails.queryFn(),
  );
});

// todo: add simpler, more extensive validation for the menu item ids
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;
  if (!info.pageUrl) return;
  if (typeof info.menuItemId !== "string") return;

  const [emailId, presetName] = info.menuItemId.split(".");
  if (!emailId || !presetName) return;
  if (info.menuItemId !== `${emailId}.${presetName}`) return;

  const emailEntries = await emails.queryFn();
  const email = emailEntries.find((entry) => entry.id === emailId);
  if (!email) return;
  const preset = await presets.mutationFn("select", presetName as PresetName);
  if (!preset.detail) return;
  const subaddress = `${email.user}${email.separator}${preset.detail}@${email.domain}`;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (value: string) => {
      const element = document.activeElement;
      if (!(element instanceof HTMLInputElement)) return;
      element.value = value;
    },
    args: [subaddress],
  });
});

const createContextMenus = (emailEntries: z.infer<typeof emails.schema>) => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      title: "Autofill",
      id: "autofill",
      contexts: ["editable"],
    });

    emailEntries.forEach((entry) => {
      chrome.contextMenus.create({
        title: entry.address,
        id: entry.id,
        parentId: "autofill",
        contexts: ["editable"],
      });

      PresetName._def.values.forEach((preset) => {
        chrome.contextMenus.create({
          title: preset,
          id: `${entry.id}.${preset}`,
          parentId: entry.id,
          contexts: ["editable"],
        });
      });
    });
  });
};
