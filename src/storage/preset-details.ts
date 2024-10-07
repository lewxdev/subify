import { useCallback, useEffect } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { name } from "../../package.json";

const KEY = `${name}.preset-details`;

export type PresetName = "custom" | "timestamp" | "domain";

type State = Record<PresetName, string> & { selectedPreset: PresetName };

const initialState: State = {
  custom: "custom",
  timestamp: "",
  domain: "",
  selectedPreset: "domain",
};

type DispatchArgs =
  | [action: "select", payload: PresetName]
  | [action: "update", payload: (prevState: State) => Partial<State>];

export function usePresetDetails() {
  const [{ selectedPreset, ...presets }, setPresets, { isLoading }] =
    useStorage<State>(KEY, (v) => v || initialState);

  const dispatchPresets = useCallback(
    (...[action, payload]: DispatchArgs) =>
      setPresets((prevState = initialState) => {
        const timestamp = Date.now().toString();
        switch (action) {
          case "select":
            return payload
              ? { ...prevState, timestamp, selectedPreset: payload }
              : prevState;
          case "update":
            return { ...prevState, ...payload(prevState), timestamp };
          default:
            return prevState;
        }
      }),
    [setPresets],
  );

  useEffect(() => {
    if (isLoading) return;
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const domain = tab?.url
        ? new URL(tab.url).hostname.replace(/^www\./, "")
        : "";
      dispatchPresets("update", ({ selectedPreset: preset }) => ({
        domain,
        selectedPreset: preset === "domain" && !domain ? "timestamp" : preset,
      }));
    });
  }, [isLoading, dispatchPresets]);

  return { selectedPreset, presets, dispatchPresets };
}
