// MUI Components
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

// Hooks
import { useState, useEffect } from "react"

// Dependencies
import { validate } from "email-validator"

/**
 * The form component responsible for submitting data to `chrome.storage`
 * @param {object} props - Provided properties via JSX attributes
 * @param {() => void?} props.onRedundant - Runs when storage matches the input
 * @param {(value: string) => void?} props.onSuccess - Runs when input set in storage
 * @param {string} props.value - A stateful value to provide to the input
 * @param {(value: string) => Promise<string>} props.setter - A method of setting the form value
 */
export default function EmailForm({
	onRedundant,
	onSuccess,
	value: emailAddress,
	setter,
}) {
	const [inputValue, setInputValue] = useState("")
	const [errorText, setErrorText] = useState("")

	/** @type {React.ChangeEventHandler} */
	const handleChange = ({ target: { value } }) => {
		setInputValue(value)
		setErrorText("")
	}

	/** @type {React.FormEventHandler} */
	const handleSubmit = (event) => {
		event.preventDefault()

		if (!validate(inputValue)) setErrorText("Invalid email address")
		else if (emailAddress === inputValue) onRedundant?.()
		else setter(inputValue).then((value) => onSuccess?.(value))
	}

	// Set `inputValue` to the email address stored in `chrome.storage`
	// Allows the input to initialize with the current value
	useEffect(() => setInputValue(emailAddress), [emailAddress])

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ display: "flex", mt: 1, mb: 1.5 }}>
			<TextField
				error={!!errorText}
				onChange={handleChange}
				value={inputValue}
				variant="outlined"
				label={errorText || "Email address"}
				placeholder="Input an email address"
				size="small"
				sx={{ flex: "1", mr: 1 }}
			/>
			<Button variant="outlined" type="submit">
				Save
			</Button>
		</Box>
	)
}
