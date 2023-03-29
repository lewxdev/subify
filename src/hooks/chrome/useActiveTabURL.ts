import { useEffect, useState } from "react";

/** @returns The URL of the active tab in the current window */
export default function useActiveTabURL(): URL | null {
  const [value, setValue] = useState<URL | null>(null);

  useEffect(() => {
    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then(([{ url }]) => url && setValue(new URL(url)));
  }, []);

  return value;
}
