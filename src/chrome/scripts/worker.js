/* globals chrome */

import { INJECT } from "@chrome/messages"
import { INSTALLED, MESSAGE } from "@chrome/events"

// This service worker runs passively in the context of the Chrome extension
// Learn more: https://developer.chrome.com/docs/extensions/mv3/service_workers/

// Installed Event
chrome.runtime.onInstalled.addListener(() => {
	console.log(INSTALLED, "success")
})

// Message Event
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log(MESSAGE, message)

	// An implementation of message passing akin to redux-like actions
	switch (message.type) {
		case INJECT:
			return sendResponse({ ok: true, sender })
		default:
			return sendResponse({
				ok: false,
				message: `Unknown type: ${message.type}`,
			})
	}
})
