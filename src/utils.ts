import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";
import type { Email } from "@/storage/emails";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getDomain = async (url?: string) => {
  url ||= await chrome.tabs
    .query({ active: true, currentWindow: true })
    .then(([tab]) => tab?.url);

  return url ? new URL(url).hostname.replace(/^www\./, "") : "";
};

export const isMatchingInput = <TInput extends Record<string, z.Primitive>>(
  schema: z.ZodType<unknown, z.ZodObjectDef, TInput>,
  a: TInput,
  b: TInput,
) =>
  Object.entries(schema._def.shape()).every(
    ([key, innerSchema]) => innerSchema.isOptional() || a[key] === b[key],
  );

export const unsafeIncludes = <T>(array: T[], value: unknown): value is T =>
  array.includes(value as T);

export const getSubaddress = (
  { address, domain, user, separator }: z.infer<Email>,
  detail: string,
) => (detail ? `${user}${separator}${detail}@${domain}` : address);
