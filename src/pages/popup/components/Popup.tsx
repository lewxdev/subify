import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import AlertProvider from "./AlertProvider";
import DetailsTable from "./DetailsTable";
import EmailAutocomplete from "./EmailAutocomplete";
import Footer from "./Footer";

export default function Popup() {
  return (
    <>
      <CssBaseline />
      <Paper square sx={{ p: 2, userSelect: "none", width: 500 }}>
        <AlertProvider>
          <EmailAutocomplete />
          <DetailsTable />
        </AlertProvider>
        <Footer />
      </Paper>
    </>
  );
}
