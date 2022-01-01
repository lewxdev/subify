import { useEffect } from "react"

/**
 * Perform a callback once on component mount; supplement for `componentDidMount()`
 * @param {import("react").EffectCallback} callback
 */
export default function useMount(callback) {
	useEffect(callback, [])
}