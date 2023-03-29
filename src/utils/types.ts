import z from "zod";

export enum StoreId {
  EMAIL_ADDRESSES = "EMAIL_ADDRESSES"
}

export enum EventId {
  INSTALLED = "INSTALLED",
  MESSAGE = "MESSAGE",
  STORAGE_CHANGED = "STORAGE_CHANGED",
  UI_ALERT = "UI_ALERT"
}

// zod

export const commonEmailSchema = z.string().email();

export const storeEmailSchema = z.object({
  /** The stored email address, used as a unique identifier */
  key: z.string(),
  /** Whether the email is saved as the default (`true` on first save) */
  isDefault: z.boolean(),
  /** Whether the email was most recently selected (`true` on first save) */
  isLastSelected: z.boolean()
});

export type StoreEmail = z.infer<typeof storeEmailSchema>;

export const storeChangedMessageSchema = z.object({
  type: z.literal(EventId.STORAGE_CHANGED),
  area: z.enum(["local", "managed", "session", "sync"]),
  changes: z.record(
    z.object({
      newValue: z.any().optional(),
      oldValue: z.any().optional()
    })
  )
});

export type StoreChangedMessage = z.infer<typeof storeChangedMessageSchema>;

export const uiAlertMessageSchema = z.object({
  type: z.literal(EventId.UI_ALERT),
  message: z.string(),
  severity: z.enum(["error", "info", "success", "warning"]).optional()
});

export type UIAlertMessage = z.infer<typeof uiAlertMessageSchema>;

export const createUIAlertMessage = (
  message: string,
  severity?: UIAlertMessage["severity"]
): UIAlertMessage => ({ type: EventId.UI_ALERT, message, severity });
