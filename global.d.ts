import type { z } from "zod";

declare module "zod/lib/external" {
  /**
   * (**custom**) a union of the input / output type of a zod schema.
   * constrains the type to an essentially parse-safe value
   */
  export type parsable<T extends z.ZodType> = z.input<T> | z.output<T>;
}
