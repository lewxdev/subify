/* globals chrome */

import { INJECT } from "@chrome/messages"

// This content script injects itself into specified `matches` (see manifest.json)
// Learn more: https://developer.chrome.com/docs/extensions/mv3/content_scripts/

chrome.runtime.sendMessage({ type: INJECT }, (response) => {
	if (response.ok) console.log(INJECT, "success")
})