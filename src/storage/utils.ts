import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import type { z } from "zod";
import { queryClient } from "@/components/query-provider";

// note: storage area is hardcoded "sync", this can be configurable in the future
export const createStorageHooks = <TOutput, TInput, TPayloads>(
  key: string,
  schema: z.ZodType<TOutput, z.ZodTypeDef, TInput>,
  reducers: {
    [K in keyof TPayloads]: (
      value: TOutput,
      payload: TPayloads[K],
    ) => TInput | Promise<TInput>;
  },
) => ({
  queryOptions: queryOptions<TOutput>({
    queryKey: ["storage", key],
    queryFn: async () => {
      const { [key]: data } = await chrome.storage.sync.get(key);
      return schema.parseAsync(data);
    },
  }),
  useQuery({
    queryKey = [],
    ...options
  }: Partial<Parameters<typeof useQuery<TOutput>>[0]> = {}) {
    return useQuery<TOutput>({
      ...this.queryOptions,
      ...options,
      queryKey: [...this.queryOptions.queryKey, ...queryKey],
    });
  },
  useMutation<K extends keyof TPayloads>(
    action: K,
    options?: Partial<
      Parameters<typeof useMutation<void, Error, TPayloads[K]>>[0]
    >,
  ) {
    return useMutation<void, Error, TPayloads[K]>({
      mutationFn: async (payload: TPayloads[K]) => {
        const value = await queryClient.ensureQueryData(this.queryOptions);
        const data = await reducers[action](value, payload);
        const newValue = await schema.parseAsync(data);
        return chrome.storage.sync.set({ [key]: newValue });
      },
      onSuccess: () => queryClient.invalidateQueries(this.queryOptions),
      ...options,
    });
  },
});
