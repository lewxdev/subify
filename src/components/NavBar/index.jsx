// MUI Components
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

/** The common, portable navigation bar for all interfaces */
export default function NavBar() {
	return (
		<Toolbar>
			<AppBar sx={{ p: 1 }}>
				<Typography variant="h6">Signup Subaddressing</Typography>
			</AppBar>
		</Toolbar>
	)
}
