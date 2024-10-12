import { z } from "zod";
import { createStorageHooks } from "@/storage/utils";

const schema = z
  .object({
    custom: z.string().default("custom"),
    name: z.enum(["custom", "domain", "timestamp"]).default("domain"),
  })
  .default({});

export type PresetName = z.infer<typeof schema>["name"];

export const presets = createStorageHooks("presets", schema, {
  select: (state, payload: PresetName) => ({ ...state, name: payload }),
  update: (state, payload: string) => ({ ...state, custom: payload }),
});
