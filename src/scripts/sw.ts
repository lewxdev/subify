import { EventId } from "/@/utils/types";
import type { StoreChangedMessage } from "/@/utils/types";

// this service worker runs passively in the context of the Chrome extension
// learn more: https://developer.chrome.com/docs/extensions/mv3/service_workers

// (runtime) install event
chrome.runtime.onInstalled.addListener(() => {
  console.info(EventId.INSTALLED, "success");
});

chrome.runtime.onMessage.addListener((message, sender) => {
  console.info(EventId.MESSAGE, message, sender);
});

// (storage) changed event
chrome.storage.onChanged.addListener((changes, area) => {
  chrome.runtime.sendMessage<StoreChangedMessage>({
    area,
    changes,
    type: EventId.STORAGE_CHANGED,
  });
});
