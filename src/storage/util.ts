/* eslint-disable @typescript-eslint/no-explicit-any */
// bro is out here writing his own library

import { queryOptions, type UseMutationOptions } from "@tanstack/react-query";
import type { z } from "zod";

type Reducers<TOutput, TInput, ReducerPayloads> = {
  [K in keyof ReducerPayloads]: (
    value: TOutput,
    payload: ReducerPayloads[K],
  ) => TInput | Promise<TInput>;
};

// note:
// * key is not part of the generic, but it may not be required by react-query
// * storage area is "sync" by default, but this can be configurable in the future
export const createStorageManager = <TOutput, TInput, ReducerPayloads>(
  key: string,
  schema: z.ZodType<TOutput, z.ZodTypeDef, TInput>,
  reducers: Reducers<TOutput, TInput, ReducerPayloads>,
) => {
  const getClient = () => window.queryClient;
  const getOptions = () =>
    queryOptions({
      queryKey: ["storage", key] as const,
      queryFn: async () => {
        const { [key]: data } = await chrome.storage.sync.get(key);
        return schema.parseAsync(data);
      },
    });

  const mutations = (Object.keys(reducers) as (keyof ReducerPayloads)[]).reduce(
    (source, action) => {
      source[action] = {
        mutationFn: async (payload: ReducerPayloads[typeof action]) => {
          const queryClient = getClient();
          if (!queryClient) return;

          const value = await queryClient.ensureQueryData(getOptions());
          const data = await reducers[action](value, payload);
          const newValue = await schema.parseAsync(data);
          return chrome.storage.sync.set({ [key]: newValue });
        },
        onMutate: async (variables) => {
          if (process.env.NODE_ENV === "production") return;

          console.log(
            `%c mutate.${key}.${action.toString()} `,
            "background-color: springgreen; color: seagreen; font-weight: bold;",
            variables,
          );
        },
        onSuccess: () => {
          getClient()?.invalidateQueries(getOptions());
        },
      };
      return source;
    },
    {} as {
      [K in keyof ReducerPayloads]: UseMutationOptions<
        void,
        Error,
        ReducerPayloads[K]
      >;
    },
  );

  return { ...mutations, queryOptions: getOptions };
};
