import { z } from "zod";
import { useStorage } from "@/hooks/use-storage";

export enum Preset {
  Custom = "custom",
  Timestamp = "timestamp",
  Domain = "domain",
}

const State = z
  .object({
    custom: z.string().default("custom"),
    selected: z.nativeEnum(Preset).default(Preset.Domain),
  })
  .default({});

const reducer = (
  state: z.output<typeof State>,
  [type, payload]:
    | [type: "select", payload: Preset]
    | [type: "update", payload: string],
): z.parsable<typeof State> => {
  switch (type) {
    case "select":
      return payload ? { ...state, selected: payload } : state;
    case "update":
      return { ...state, custom: payload };
    default:
      return state;
  }
};

export function usePresets() {
  return useStorage("preset", State, reducer);
}
