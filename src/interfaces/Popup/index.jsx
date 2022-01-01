import Paper from "@mui/material/Paper"
import { AlertPanel, EmailForm, InfoTable, NavBar } from "@components"

import { useState } from "react"

import { COPY_SUCCESS, SUBMIT_REDUNDANT, SUBMIT_SUCCESS } from "@helpers/alerts"

/** The extension interface (UI) for the popup browser action */
export default function Popup() {
	const [alertContent, setAlertContent] = useState({ message: null })

	return (
		<Paper sx={{ p: 2, width: 500 }}>
			<NavBar />
			<EmailForm
				onRedundant={() => setAlertContent(SUBMIT_REDUNDANT)}
				onSuccess={() => setAlertContent(SUBMIT_SUCCESS)}
			/>
			<InfoTable onCopy={() => setAlertContent(COPY_SUCCESS)} />
			<AlertPanel {...alertContent} />
		</Paper>
	)
}
