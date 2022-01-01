import Paper from "@mui/material/Paper"
import { AlertPanel, EmailForm, InfoTable, NavBar } from "@components"

import { useState } from "react"
import useChromeStorage from "@chrome/hooks/useChromeStorage"

import { EMAIL_ADDRESS } from "@chrome/storage"
import { COPY_SUCCESS, SUBMIT_REDUNDANT, SUBMIT_SUCCESS } from "@helpers/alerts"

/** The extension interface (UI) for the popup browser action */
export default function Popup() {
	const [alertContent, setAlertContent] = useState({ message: null })
	const [emailAddress, setEmailAddress] = useChromeStorage(EMAIL_ADDRESS)

	return (
		<Paper sx={{ p: 2, width: 500 }}>
			<NavBar />
			<EmailForm
				onRedundant={() => setAlertContent(SUBMIT_REDUNDANT)}
				onSuccess={() => setAlertContent(SUBMIT_SUCCESS)}
				value={emailAddress}
				setter={setEmailAddress}
			/>
			<InfoTable
				onCopy={() => setAlertContent(COPY_SUCCESS)}
				value={emailAddress}
			/>
			<AlertPanel {...alertContent} />
		</Paper>
	)
}
