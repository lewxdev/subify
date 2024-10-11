import type { z } from "zod";

declare module "zod/lib/helpers/util" {
  declare namespace util {
    type required<T extends z.ZodType, K extends keyof T["_output"]> = Partial<
      Omit<T["_output"], K>
    > &
      Pick<T["_output"], K>;
  }
}
