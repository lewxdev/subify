import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getDomain = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.url ? new URL(tab.url).hostname.replace(/^www\./, "") : "";
};

export const isMatchingInput = <TInput extends Record<string, z.Primitive>>(
  schema: z.ZodType<unknown, z.ZodObjectDef, TInput>,
  a: TInput,
  b: TInput,
) =>
  Object.entries(schema._def.shape()).every(
    ([key, innerSchema]) => innerSchema.isOptional() || a[key] === b[key],
  );
