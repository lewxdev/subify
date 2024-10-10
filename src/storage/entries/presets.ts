import { z } from "zod";
import { createStorageManager } from "@/storage/util";

const key = "presets";

const schema = z
  .object({
    custom: z.string().default("custom"),
    name: z.enum(["custom", "domain", "timestamp"]).default("domain"),
  })
  .default({});

export type PresetName = z.infer<typeof schema>["name"];
export const presets = createStorageManager(key, schema, {
  select: (state, payload: z.output<typeof schema>["name"]) =>
    payload ? { ...state, name: payload } : state,
  update: (state, payload: string) => ({ ...state, custom: payload }),
});
