import { z } from "zod";
import { createStorageUtils } from "@/storage/utils";
import { isMatchingInput } from "@/utils";

const schema = z
  .object({
    id: z.string().default(() => crypto.randomUUID()),
    createdAt: z.number().default(() => Date.now()),
    url: z.string(),
    value: z.string(),
  })
  .array()
  .default([]);

export const History = schema._def.innerType.element;
export type History = typeof History;

export const history = createStorageUtils("history", schema, {
  // rule: update if inserted entry exists AND move updated entry to the top
  insert: (state, payload: z.input<History>) => {
    const index = state.findIndex((entry) =>
      isMatchingInput(History, payload, entry),
    );
    const [newEntry] = index === -1 ? [payload] : state.splice(index, 1);
    return [{ ...newEntry, createdAt: Date.now() }, ...state];
  },
  remove: (state, payload: z.util.required<History, "id">) =>
    state.filter((entry) => entry.id !== payload.id),
});
