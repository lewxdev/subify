import type { QueryClient } from "@tanstack/react-query";
import type { z } from "zod";

declare global {
  interface Window {
    queryClient: QueryClient | undefined;
  }
}

declare module "zod/lib/helpers/util" {
  declare namespace util {
    type required<T extends z.ZodType, K extends keyof T["_output"]> = Partial<
      Omit<T["_output"], K>
    > &
      Pick<T["_output"], K>;
  }
}
