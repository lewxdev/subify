import { useCallback } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import { z } from "zod";
import { name } from "../../package.json";

const KEY = `${name}.email-entries`;

export const EmailEntry = z
  .object({
    id: z.string().default(() => Date.now().toString(36)),
    isSelected: z.boolean().default(false),
    address: z.string().email(),
    separator: z.string().length(1),
  })
  .transform((entry) => {
    const [user, domain] = entry.address.split("@") as [string, string];
    return { ...entry, user, domain };
  });

export type EmailEntry = z.infer<typeof EmailEntry>;

type DispatchArgs =
  | [action: "insert", payload: EmailEntry]
  | [action: "remove", payload: EmailEntry]
  | [action: "update", payload: Partial<EmailEntry> & Pick<EmailEntry, "id">]
  | [action: "select", payload: Partial<EmailEntry> & Pick<EmailEntry, "id">];

export function useEmailEntries() {
  const [entries, setEntries] = useStorage<EmailEntry[]>(KEY, (v) => v || []);
  const selectedEntry = entries.find((entry) => entry.isSelected);
  const dispatchEntries = useCallback(
    (...[action, payload]: DispatchArgs) => {
      switch (action) {
        case "insert":
          // select the inserted entry if no entries exist
          return setEntries((prevEntries = []) =>
            prevEntries.concat(
              prevEntries.length ? payload : { ...payload, isSelected: true },
            ),
          );
        case "update":
          // deselect all entries if the updated entry is selected
          return setEntries((prevEntries = []) =>
            prevEntries.map((entry) =>
              entry.id === payload.id
                ? { ...entry, ...payload }
                : payload.isSelected
                  ? { ...entry, isSelected: false }
                  : entry,
            ),
          );
        case "remove":
          // select the first entry if the removed entry was selected
          return setEntries((prevEntries = []) =>
            prevEntries
              .filter((entry) => entry.id !== payload.id)
              .map((entry, index) =>
                payload.isSelected ? { ...entry, isSelected: !index } : entry,
              ),
          );
        case "select":
          return dispatchEntries("update", { ...payload, isSelected: true });
      }
    },
    [setEntries],
  );
  return { selectedEntry, entries, dispatchEntries } as const;
}
