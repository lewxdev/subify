import { useStorage } from "@plasmohq/storage/hook";
import { z } from "zod";

export type EmailEntry = z.infer<typeof EmailEntry>;

export const EmailEntry = z.object({
  id: z.string().default(() => Date.now().toString(36)),
  address: z.string().email(),
  separator: z.string().length(1),
});

export function useEmailEntries() {
  const [entries, setEntries] = useStorage<EmailEntry[]>("email-entries", []);
  const dispatch = (action: "insert" | "update" | "remove", data: EmailEntry) =>
    setEntries((entries = []) => {
      switch (action) {
        case "insert":
          return entries.concat(data);
        case "update":
          return entries.map((entry) => (entry.id === data.id ? data : entry));
        case "remove":
          return entries.filter((entry) => entry.id !== data.id);
      }
    });
  return [entries, dispatch] as const;
}
