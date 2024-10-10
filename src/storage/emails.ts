import { z } from "zod";
import { useStorage } from "@/hooks/use-storage";

export const Email = z
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
  });
export type Email = z.output<typeof Email>;

const State = Email.array().default([]);

const reducer = (
  state: z.output<typeof State>,
  [type, payload]:
    | [type: "insert", payload: z.input<typeof Email>]
    | [type: "update", payload: Pick<Email, "id"> & Partial<Email>]
    | [type: "remove", payload: Pick<Email, "id" | "isSelected">]
    | [type: "select", payload: Pick<Email, "id">],
): z.parsable<typeof State> => {
  switch (type) {
    case "insert":
      // select if no emails exist AND skip if the email already exists
      return !state.find((email) => email.address === payload.address) ?
          [...state, { ...payload, isSelected: !state.length }]
        : state;
    case "update":
      // deselect all emails if the updated email is selected
      return state.map((email) =>
        email.id === payload.id ?
          { ...email, ...payload }
        : { ...email, isSelected: !payload.isSelected && email.isSelected },
      );
    case "remove":
      // select the first email if the removed email is selected
      return state
        .filter((email) => email.id !== payload.id)
        .map((email, index) =>
          // todo: make `isSelected` not required on the payload
          payload.isSelected ? { ...email, isSelected: !index } : email,
        );
    case "select":
      return reducer(state, ["update", { ...payload, isSelected: true }]);
    default:
      return state;
  }
};

export function useEmails() {
  return useStorage("emails", State, reducer);
}
