/**
 * Returns an object to be passed in as props to the `AlertPanel` component
 * @param {import("@mui/material").AlertColor} severity - The severity of the alert
 * @param {Alert} message - The message text to display on the alert
 */
const getAlertContent = (severity, message) => ({ severity, message })

/** Alert props for successful write to clipboard */
export const COPY_SUCCESS =
	getAlertContent("success", "Successfully copied to clipboard.")

/** Alert props for redundant submission to storage */
export const SUBMIT_REDUNDANT =
	getAlertContent("info", "Email already saved to storage.")

/** Alert props for successful submission to storage */
export const SUBMIT_SUCCESS =
	getAlertContent("success", "Successfully saved email to storage.")