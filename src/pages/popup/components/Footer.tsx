import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { version } from "/~/package.json";

export default function Footer() {
  return (
    <Box display="flex" px={2} py={1} justifyContent="space-between">
      <Typography variant="caption">v{version}</Typography>
      <Typography alignItems="center" variant="caption">
        See the open source code on{" "}
        <a
          href="https://github.com/lewxdev/signup-subaddressing"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        {" • "}
        Icon by{" "}
        <a
          href="https://www.flaticon.com/free-icon/at_1626329"
          rel="noopener noreferrer"
          target="_blank"
        >
          Pixelmeetup
        </a>
      </Typography>
    </Box>
  );
}
