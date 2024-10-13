import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import type { z } from "zod";
import { queryClient } from "@/components/query-provider";

// note: storage area is hardcoded "sync", this can eventually be configurable
export const createStorageUtils = <TOutput, TInput, TPayloads>(
  key: string,
  schema: z.ZodType<TOutput, z.ZodTypeDef, TInput>,
  reducers: {
    [K in keyof TPayloads]: (
      value: TOutput,
      payload: TPayloads[K],
    ) => TInput | Promise<TInput>;
  },
) => ({
  key,
  schema,

  async queryFn() {
    const { [key]: data } = await chrome.storage.sync.get(key);
    return schema.parseAsync(data);
  },

  get queryOptions() {
    return queryOptions<TOutput>({
      queryKey: ["storage", key],
      queryFn: this.queryFn,
    });
  },

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

  async mutationFn<K extends keyof TPayloads>(
    action: K,
    payload: TPayloads[K],
  ) {
    const value = await queryClient.ensureQueryData(this.queryOptions);
    const data = await reducers[action](value, payload);
    const newValue = await schema.parseAsync(data);
    await chrome.storage.sync.set({ [key]: newValue });
    return newValue;
  },

  useMutation<K extends keyof TPayloads>(
    action: K,
    options?: Partial<
      Parameters<typeof useMutation<TOutput, Error, TPayloads[K]>>[0]
    >,
  ) {
    return useMutation<TOutput, Error, TPayloads[K]>({
      mutationFn: this.mutationFn.bind(this, action),
      onSuccess: () => queryClient.invalidateQueries(this.queryOptions),
      ...options,
    });
  },
});
