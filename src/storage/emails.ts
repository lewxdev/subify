import { z } from "zod";
import { createStorageHooks } from "@/storage/utils";
import { isMatchingInput } from "@/utils";

// todo: try to handle schema migration from v2 to v3
// EMAIL_ADDRESS: string (email)
// EMAIL_ADDRESSES: { isDefault: boolean, isLastSelected: boolean, key: string (email) }[]

const schema = z
  .object({
    id: z.string().default(() => crypto.randomUUID()),
    isSelected: z.boolean().default(false),
    address: z.string().email(),
    separator: z.string().length(1),
  })
  .transform((entry) => {
    // todo: add known separators by their domain
    // see: https://en.wikipedia.org/wiki/Email_address#Sub-addressing
    const [user, domain] = entry.address.split("@") as [string, string];
    return { ...entry, user, domain };
  })
  .array()
  .default([]);

export const Email = schema._def.innerType.element;
export type Email = typeof Email;

export const emails = createStorageHooks("emails", schema, {
  // rule: select inserted entry if no entries exist AND skip if inserted entry exists
  insert: (state, payload: z.input<Email>) =>
    !state.find((entry) => isMatchingInput(Email._def.schema, payload, entry)) ?
      [...state, { ...payload, isSelected: !state.length }]
    : state,
  // rule: deselect all entries if updated entry `isSelected`
  update: (state, payload: z.util.required<Email, "id">) =>
    state.map((entry) =>
      entry.id === payload.id ?
        { ...entry, ...payload }
      : { ...entry, isSelected: !payload.isSelected && entry.isSelected },
    ),
  // rule: select first entry if removed entry `isSelected`
  remove: (state, payload: z.util.required<Email, "id" | "isSelected">) =>
    state
      .filter((entry) => entry.id !== payload.id)
      .map((entry, index) =>
        payload.isSelected ? { ...entry, isSelected: !index } : entry,
      ),
});
