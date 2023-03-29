import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

import manifest from "/~/crxjs.config";

export default defineConfig({
  plugins: [crx({ manifest }), react()],
  resolve: {
    alias: {
      "/@": resolve(__dirname, "src"),
      "/~": __dirname
    }
  }
});
