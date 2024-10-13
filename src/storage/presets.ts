import { z } from "zod";
import { createStorageUtils } from "@/storage/utils";
import { getDomain } from "@/utils";

export const PresetName = z.enum(["custom", "domain", "timestamp"]);
export type PresetName = z.infer<typeof PresetName>;

const schema = z
  .object({
    presetName: PresetName.default("domain"),
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

export const presets = createStorageUtils("presets", schema, {
  select: (state, payload: PresetName) => ({ ...state, presetName: payload }),
  update: (state, payload: string) => ({ ...state, custom: payload }),
});
