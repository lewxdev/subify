// MUI Components
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

// Hooks
import React, { useEffect, useState } from "react"
import useActiveURL from "@hooks/useActiveURL"

// Dependencies
import sha256 from "sha256"

/**
 * The component displaying relevant data tabularly
 * @param {object} props - Provided properties via JSX attributes
 * @param {() => void} props.onCopy - Runs when `parsedEmail` is written to the clipboard
 * @param {string} props.value - The value (email address) to provide to the table
 */
export default function InfoTable({ onCopy, value: emailAddress }) {
	const url = useActiveURL()
	const [parsedEmail, setParsedEmail] = useState("")

	/** @type {React.MouseEventHandler} */
	const handleCopyText = () =>
		navigator.clipboard.writeText(parsedEmail).then(onCopy)

	// Parse email address when the page URL or stored email address changes
	useEffect(() => {
		if (!url || !emailAddress) return
		const [user, host] = emailAddress.split("@", 2)
		const hash = sha256(url.host).slice(0, 8)
		setParsedEmail(`${user}+${hash}@${host}`)
	}, [url, emailAddress])

	return (
		<Table>
			<TableRow sx={{ display: "flex" }}>
				<TableCell sx={{ width: 64 }}>
					<Typography variant="button">URL</Typography>
				</TableCell>
				<TableCell sx={{ flex: "1" }} align="left">
					<Typography variant="body1" noWrap>
						{url?.host || "Retrieving..."}
					</Typography>
				</TableCell>
			</TableRow>
			<TableRow sx={{ display: "flex" }}>
				<TableCell sx={{ width: 64 }}>
					<Typography variant="button">Email</Typography>
				</TableCell>
				<TableCell sx={{ flex: "1", width: 0 }}>
					<Typography variant="body1" noWrap>
						{parsedEmail
							? (() => {
									const [user, hash, host] =
										parsedEmail.split(/\+|@/g, 3)
									return (
										<span>
											{user}+<u>{hash}</u>@{host}
										</span>
									)
							  })()
							: "Parsing..."}
					</Typography>
				</TableCell>
				<TableCell>
					<Tooltip title="Copy email">
						<IconButton
							disabled={!parsedEmail}
							size="small"
							onClick={handleCopyText}>
							<Icon>content_copy</Icon>
						</IconButton>
					</Tooltip>
				</TableCell>
			</TableRow>
		</Table>
	)
}
