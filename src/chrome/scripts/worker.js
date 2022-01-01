/* globals chrome */

import { STORAGE_CHANGED } from "@chrome/messages"
import { INSTALLED } from "@chrome/events"

// This service worker runs passively in the context of the Chrome extension
// Learn more: https://developer.chrome.com/docs/extensions/mv3/service_workers/

// Installed Event
chrome.runtime.onInstalled.addListener(() => {
	console.log(INSTALLED, "success")
})

// Storage Changed Event
chrome.storage.onChanged.addListener((changes, areaName) => {
	chrome.runtime.sendMessage({
		type: STORAGE_CHANGED,
		changes,
		areaName,
	})
})
