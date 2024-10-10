import { z } from "zod";
import { createStorageManager } from "@/storage/util";

const key = "emails";
const schema = z
  .object({
    id: z.string().default(() => crypto.randomUUID()),
    isSelected: z.boolean().default(false),
    address: z.string().email(),
    separator: z.string().length(1),
  })
  .transform((email) => {
    // todo: add known separators by their domain
    // see: https://en.wikipedia.org/wiki/Email_address#Sub-addressing
    const [user, domain] = email.address.split("@") as [string, string];
    return { ...email, user, domain };
  })
  .array()
  .default([]);

export const Email = schema._def.innerType.element;
export type Email = typeof Email;

export const emails = createStorageManager(key, schema, {
  insert: (state, payload: z.input<Email>) =>
    // select if no emails exist AND skip if the email already exists
    !state.find((email) => email.address === payload.address) ?
      [...state, { ...payload, isSelected: !state.length }]
    : state,
  update: (state, payload: z.util.required<Email, "id">) =>
    // deselect all emails if the updated email is selected
    state.map((email) =>
      email.id === payload.id ?
        { ...email, ...payload }
      : { ...email, isSelected: !payload.isSelected && email.isSelected },
    ),
  remove: (state, payload: z.util.required<Email, "id" | "isSelected">) =>
    // select the first email if the removed email is selected
    state
      .filter((email) => email.id !== payload.id)
      .map((email, index) =>
        payload.isSelected ? { ...email, isSelected: !index } : email,
      ),
  // select: (state, payload: z.util.required<Email, "id">) =>
  //   this.update(state, { ...payload, isSelected: true }),
});
