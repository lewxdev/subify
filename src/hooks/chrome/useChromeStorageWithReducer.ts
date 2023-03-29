import useChromeStorageWithState from "./useChromeStorageWithState";

/**
 * Identical to `useChromeStorageWithState()`, but uses a Redux-style
 * reducer function to update the state.
 * @param key The key of the value in storage to interface with
 * @param reducer A reducer function to update the state
 * @param initialValue A value to set storage to if `undefined`
 * @param area The storage area to interface with
 * @returns A tuple of the `currentValue` and a dispatch function
 */
export function useChromeStorageWithReducer<T, A>(
  key: string,
  reducer: (state: T | undefined, action: A) => T,
  initialValue: T,
  area: chrome.storage.AreaName = "sync"
) {
  const [value, setValue] = useChromeStorageWithState(key, initialValue, area);

  const dispatch = (action: A) => {
    setValue((prevValue) => reducer(prevValue, action));
  };

  return [value, dispatch] as const;
}
