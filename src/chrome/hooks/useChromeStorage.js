/* globals chrome */

import { useState, useEffect } from "react"
import { STORAGE_CHANGED } from "@chrome/messages"

/**
 * A stateful value representing the value stored in `chrome.storage`
 * @param {string} key - The identifier for the value to retrieve
 * @param {chrome.storage.AreaName} area - The default storage area to retrieve from
 * @returns {[string, (value: string) => Promise<string>]} Similar to the return
 * value of `React.useState` where `React.Dispatch` returns a Promise
 */
export default function useChromeStorage(key, area = "sync") {
	const [value, setValue] = useState(null)

	const valueSetter = (newValue) => new Promise((resolve) => {
		chrome.storage[area].set({ [key]: newValue }, () => resolve(newValue))
	})

	// Retrieve the initial value in `chrome.storage` on mount
	useEffect(() => {
		chrome.storage[area].get([key], (result) => setValue(result[key]))
	}, [])

	// Keep the stateful `value` updated when a relevant storage event occurs
	useEffect(() => {
		const callback = ({ type, areaName, changes }) => {
			if (type === STORAGE_CHANGED && areaName === area && changes[key])
				setValue(changes[key].newValue)
		}

		chrome.runtime.onMessage.addListener(callback)
		return () => chrome.runtime.onMessage.removeListener(callback)
	})

	return [value, valueSetter]
}
