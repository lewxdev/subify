import { useCallback } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import _ from "lodash";
import { name } from "../../package.json";

const KEY = `${name}.history-entries`;

export type HistoryEntry = {
  createdAt: number;
  url: string;
  value: string;
};

type DispatchArgs =
  | [action: "insert", payload: Omit<HistoryEntry, "createdAt">]
  | [action: "remove", payload: HistoryEntry]
  | [action: "clear"];

export function useHistoryEntries() {
  const [history, setHistory] = useStorage<HistoryEntry[]>(KEY, (v) => v || []);

  const dispatchHistory = useCallback(
    (...[action, payload]: DispatchArgs) =>
      setHistory((prevEntries = []) => {
        switch (action) {
          case "insert": {
            const existingIndex = prevEntries.findIndex((entry) =>
              _.isEqual(_.omit(entry, "createdAt"), payload),
            );
            return existingIndex === -1
              ? [{ ...payload, createdAt: Date.now() }, ...prevEntries]
              : prevEntries.map((entry, index) =>
                  index === existingIndex
                    ? { ...entry, createdAt: Date.now() }
                    : entry,
                );
          }
          case "remove":
            return prevEntries.filter((entry) => !_.isEqual(entry, payload));
          case "clear":
            return [];
          default:
            return prevEntries;
        }
      }),
    [setHistory],
  );

  return { history, dispatchHistory };
}
