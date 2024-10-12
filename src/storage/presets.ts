import { z } from "zod";
import { createStorageHooks } from "@/storage/utils";
import { getDomain } from "@/utils";

const schema = z
  .object({
    presetName: z.enum(["custom", "domain", "timestamp"]).default("domain"),
    custom: z.string().default("custom"),
  })
  .transform(async (state, ctx) => {
    switch (state.presetName) {
      case "custom":
        return { ...state, detail: state.custom };
      case "domain":
        return { ...state, detail: await getDomain() };
      case "timestamp":
        return { ...state, detail: Date.now().toString() };
      default:
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `unknown preset: "${state.presetName}"`,
        });
        return z.NEVER;
    }
  })
  .default({});

export type PresetName = z.infer<typeof schema>["presetName"];

export const presets = createStorageHooks("presets", schema, {
  select: (state, payload: PresetName) => ({ ...state, presetName: payload }),
  update: (state, payload: string) => ({ ...state, custom: payload }),
});
