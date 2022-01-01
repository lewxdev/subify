// MUI Components
import Alert from "@mui/material/Alert"
import Collapse from "@mui/material/Collapse"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"

// Hooks
import { useEffect, useState } from "react"

/**
 * The section of the Popup UI to display user action feedback/information
 * @param {object} props - Provided properties via JSX attributes
 * @param {string?} props.message - The message text to display on the alert
 * @param {import("@mui/material").AlertColor?} props.severity - The severity of the alert
 */
export default function AlertPanel({ message, severity }) {
	const [open, setOpen] = useState(false)

	// Open the `AlertPanel` when there is a new `props.message`
	useEffect(() => message && setOpen(true), [message])

	return (
		<Collapse in={open}>
			<Alert
				sx={{ mt: 1.5 }}
				severity={severity}
				action={
					<IconButton onClick={() => setOpen(false)}>
						<Icon>close</Icon>
					</IconButton>
				}>
				{message}
			</Alert>
		</Collapse>
	)
}
