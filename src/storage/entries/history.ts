import { z } from "zod";
import { createStorageManager } from "@/storage/util";

const key = "history";

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

export const history = createStorageManager(key, schema, {
  insert: (state, payload: z.input<History>) => {
    const createdAt = Date.now();
    const existingIndex = state.findIndex(
      (entry) => entry.url === payload.url && entry.value === payload.value,
    );
    return existingIndex === -1 ?
        [{ ...payload, createdAt }, ...state]
      : state.map((entry, index) =>
          index === existingIndex ? { ...entry, createdAt } : entry,
        );
  },
  remove: (state, payload: z.util.required<History, "id">) =>
    state.filter((entry) => entry.id !== payload.id),
});
