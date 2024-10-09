import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryOptions,
} from "@tanstack/react-query";
import type { z } from "zod";

const storage = chrome.storage.sync;

export function useStorage<TOutput, TInput, TAction>(
  key: string,
  schema: z.ZodType<TOutput, z.ZodTypeDef, TInput>,
  reducer: (state: TOutput, action: TAction) => TInput | TOutput,
) {
  const queryClient = useQueryClient();
  const queryOptions = {
    queryKey: [key],
    queryFn: async () => {
      const { [key]: data } = await storage.get(key);
      return schema.parseAsync(data);
    },
  } satisfies QueryOptions;

  const query = useQuery(queryOptions);
  const mutation = useMutation({
    mutationFn: async (action: TAction) => {
      const prevValue = await queryClient.ensureQueryData(queryOptions);
      const newValue = await schema.parseAsync(reducer(prevValue, action));
      return storage.set({ [key]: newValue });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  return [query, mutation] as const;
}
