import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { version } from "/~/package.json";

export default function Footer() {
  return (
    <Box px={2} py={1}>
      <Typography variant="caption">
        v{version}{" • "}
        See the open source code on{" "}
        <a
          href="https://github.com/lewxdev/subify"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </Typography>
    </Box>
  );
}
