// learn more: https://developer.chrome.com/docs/extensions/develop/concepts/service-workers

import { z } from "zod";
import { emails } from "@/storage/emails";
import { PresetName, presets } from "@/storage/presets";
import { getSubaddress, unsafeIncludes } from "@/utils";
import { displayName } from "../package.json";

chrome.runtime.onInstalled.addListener(async () => {
  const emailEntries = await emails.queryFn();
  createContextMenus(emailEntries);
});

chrome.storage.onChanged.addListener(async ({ [emails.key]: emailsChange }) => {
  if (!emailsChange) return;
  const emailEntries = await emails.schema.parseAsync(emailsChange.newValue);
  createContextMenus(emailEntries);
});

// todo: add simpler, more extensive validation for the menu item ids
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (
    !tab?.id ||
    !info.pageUrl ||
    !(typeof info.menuItemId === "string") ||
    !unsafeIncludes(PresetName._def.values, info.menuItemId)
  )
    return;

  const email = await emails
    .queryFn()
    .then((entries) => entries.find((entry) => entry.isSelected));
  const subaddress = await presets
    .mutationFn("select", info.menuItemId)
    .then(({ detail }) => getSubaddress(email!, detail));

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [subaddress],
    func: (value) => {
      const element = document.activeElement;
      if (!(element instanceof HTMLInputElement)) return;
      element.value = value;
    },
  });
});

const createContextMenus = (entries: z.infer<typeof emails.schema>) => {
  chrome.contextMenus.removeAll(() => {
    if (!entries.some((entry) => entry.isSelected)) return;

    const parentId = chrome.contextMenus.create({
      id: "autofill",
      title: `${displayName} autofill...`,
      contexts: ["editable"],
    });

    PresetName._def.values.forEach((presetName) => {
      chrome.contextMenus.create({
        id: presetName,
        title: presetName,
        parentId,
        contexts: ["editable"],
      });
    });
  });
};
