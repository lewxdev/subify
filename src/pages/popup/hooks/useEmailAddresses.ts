import { createUIAlertMessage, StoreId } from "/@/utils/types";
import type { StoreEmail } from "/@/utils/types";

import { useChromeStorageWithReducer } from "/@/hooks/chrome/useChromeStorageWithReducer";
import { useAlertContext } from "../components/AlertProvider";

type Action =
  | { type: "create"; key: string }
  | { type: "delete"; key: string }
  | { type: "update"; key: string; prop: "isDefault" | "isLastSelected" };

const createAction =
  <T extends Action["type"]>(type: T) =>
  (action: Omit<Extract<Action, { type: T }>, "type">) => ({ type, ...action });

export const createEmail = createAction("create");
export const deleteEmail = createAction("delete");
export const updateEmail = createAction("update");

export default function useEmailAddresses() {
  const { setAlert } = useAlertContext();

  return useChromeStorageWithReducer<StoreEmail[], Action>(
    StoreId.EMAIL_ADDRESSES,
    (prevValue = [], action) => {
      switch (action.type) {
        case "create":
          return prevValue
            .map((item) => ({ ...item, isLastSelected: false }))
            .concat({
              key: action.key,
              isDefault: !prevValue.length,
              isLastSelected: true
            });

        case "delete":
          const value = prevValue.find((item) => item.key === action.key);

          if (!value) return prevValue;
          if (value.isDefault && prevValue.length > 1) {
            setAlert(createUIAlertMessage("Cannot delete default", "error"));
            return prevValue;
          }

          const result = prevValue.filter((item) => item.key !== action.key);
          return !result.some((item) => item.isLastSelected)
            ? result.map((item) => ({
                ...item,
                isLastSelected: item.isDefault
              }))
            : result;

        case "update":
          return prevValue.some((item) => item.key === action.key)
            ? prevValue.map((item) => ({
                ...item,
                [action.prop]: item.key === action.key
              }))
            : prevValue;

        default:
          return prevValue;
      }
    },
    []
  );
}
