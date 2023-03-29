import { useEffect, useRef, useState } from "react";
import { storeChangedMessageSchema } from "/@/utils/types";

/**
 * Provides a stateful value and a function to update it. Similar to
 * the `React.useState()` hook, but state persists thanks to the
 * context of the provided `chrome.storage` area.
 * (should not use dynamic parameters)
 * @param key The key of the value in storage to interface with
 * @param initialValue A value to set storage to if `undefined`
 * @param area The storage area to interface with
 * @returns A tuple of the `currentValue` and a dispatch function
 */
export default function useChromeStorageWithState<T>(
  key: string,
  initialValue: T,
  area: chrome.storage.AreaName = "sync"
) {
  const [value, setValue] = useState<T>();
  const refValue = useRef<T>();

  useEffect(() => {
    // sync initial value on first render
    chrome.storage[area].get({ [key]: initialValue }, ({ [key]: value }) => {
      setValue(refValue.current = value);
    });

    // sync subsequent changes
    const listener = (message: unknown) => {
      const result = storeChangedMessageSchema.safeParse(message);
      if (!result.success) return;

      const { newValue } = result.data.changes[key];
      setValue(refValue.current = newValue);
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  useEffect(() => {
    // sync `refValue` with `value`
    chrome.storage[area].set({ [key]: value });
  }, [value]);

  return [value, setValue] as const;
}
