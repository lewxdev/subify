import alder32 from "adler-32";

import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import ContentCopyIcon from "@mui/icons-material/ContentCopyRounded";

import useEmailAddresses from "../hooks/useEmailAddresses";
import useActiveTabURL from "/@/hooks/chrome/useActiveTabURL";
import { createUIAlertMessage } from "/@/utils/types";
import { useAlertContext } from "./AlertProvider";

/**
 * Displays the parsed subaddress (generated using the adler-32 hash
 * of the host of the active tab), the string used to generate the
 * hash, and a footer for attribution.
 */
export default function DetailsTable() {
  const [options = []] = useEmailAddresses();
  const activeTabURL = useActiveTabURL();
  const { setAlert } = useAlertContext();

  const subaddress = (() => {
    if (options.length === 0)
      return { error: "Add an email address to get started" };
    if (activeTabURL === null)
      return { error: "Unable to retrieve current tab URL" };

    const emailAddresses = options.find((item) => item.isLastSelected)!;
    const [address, domain] = emailAddresses.key.split("@");
    const hash = alder32.str(activeTabURL.host).toString(16);

    return { value: `${address}+${hash}@${domain}` };
  })();

  const handleCopy = async () => {
    if (!subaddress.value) return;

    await navigator.clipboard.writeText(subaddress.value);
    setAlert(createUIAlertMessage("Copied to clipboard", "success"));
  };

  return (
    <TableContainer sx={{ my: 1 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell variant="head">
              <Typography variant="button">Email</Typography>
            </TableCell>
            <TableCell>
              <Typography noWrap width={280}>
                {subaddress.error ?? subaddress.value}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton
                disabled={!subaddress.value}
                onClick={handleCopy}
                sx={{ m: -1, mr: -2 }}
              >
                <ContentCopyIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">
              <Typography variant="button">Site</Typography>
            </TableCell>
            <TableCell colSpan={2}>
              <Typography>{activeTabURL?.host}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
