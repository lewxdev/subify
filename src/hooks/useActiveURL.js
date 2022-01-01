/* globals chrome */

import { useState } from "react"
import useMount from "@hooks/useMount"

/**
 * Makes use of the `chrome.tabs` API to retrieve the currently active tab
 * @returns {URL} A URL object representing the currently active tab
 */
export default function useActiveURL() {
	const [activeURL, setActiveURL] = useState(null)

	useMount(() => {
		const queryInfo = { active: true, currentWindow: true }
		chrome.tabs.query(queryInfo, ([{ url }]) => setActiveURL(new URL(url)))
	})

	return activeURL
}
