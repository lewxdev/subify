import React from "react"
import ReactDOM from "react-dom"

import CssBaseline from "@mui/material/CssBaseline"
import { Popup } from "@interfaces"

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<Popup />
	</React.StrictMode>,
	document.querySelector("#root")
)
