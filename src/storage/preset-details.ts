import { useCallback, useEffect } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { name } from "../../package.json";

const KEY = `${name}.preset-details`;

export type PresetName = "custom" | "timestamp" | "domain";

const initialState = {
  custom: "custom",
  timestamp: Date.now().toString(),
  domain: "",
  selectedPreset: "domain" as PresetName,
} satisfies Record<PresetName, string> & { selectedPreset: PresetName };

type DispatchArgs =
  | [action: "select", payload: PresetName]
  | [action: "update", payload: Partial<typeof initialState>];

export function usePresets() {
  const [{ selectedPreset, ...presets }, setPresets, { isLoading }] =
    useStorage<typeof initialState>(KEY, (v) => v || initialState);

  const dispatchPresets = useCallback(
    (...[action, payload]: DispatchArgs) =>
      !isLoading &&
      setPresets((prevState = initialState) => {
        if (!action || !payload) return prevState;
        switch (action) {
          case "select":
            return { ...prevState, selectedPreset: payload };
          case "update":
            return { ...prevState, ...payload };
          default:
            return prevState;
        }
      }),
    [isLoading, setPresets],
  );

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const domain = tab?.url
        ? new URL(tab.url).hostname.replace(/^www\./, "")
        : "";
      dispatchPresets("update", {
        domain,
        timestamp: Date.now().toString(),
        selectedPreset:
          selectedPreset === "domain" && !domain ? "timestamp" : selectedPreset,
      });
    });
  }, [selectedPreset, dispatchPresets]);

  return { selectedPreset, presets, dispatchPresets };
}
