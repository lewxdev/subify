import { z } from "zod";
import { useStorage } from "@/hooks/use-storage";

const History = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  createdAt: z.number().default(() => Date.now()),
  url: z.string(),
  value: z.string(),
});
export type History = z.infer<typeof History>;

const State = History.array().default([]);

const reducer = (
  state: z.output<typeof State>,
  [type, payload]:
    | [type: "insert", payload: z.input<typeof History>]
    | [type: "remove", payload: Pick<History, "id">],
  // todo: add "clear" action
): z.parsable<typeof State> => {
  switch (type) {
    case "insert": {
      const createdAt = Date.now();
      const existingIndex = state.findIndex(
        (history) =>
          history.url === payload.url && history.value === payload.value,
      );
      return existingIndex === -1 ?
          [{ ...payload, createdAt }, ...state]
        : state.map((history, index) =>
            index === existingIndex ? { ...history, createdAt } : history,
          );
    }
    case "remove":
      return state.filter((history) => history.id !== payload.id);
    default:
      return state;
  }
};

export function useHistory() {
  return useStorage("history", State, reducer);
}
