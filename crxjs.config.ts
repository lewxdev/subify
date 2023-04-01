import { defineManifest } from "@crxjs/vite-plugin";
import startCase from "lodash/startCase";

import { description, name, version } from "/~/package.json";

/** @see {@link https://developer.chrome.com/docs/extensions/mv3/manifest/} */
export default defineManifest({
  // required
  manifest_version: 3,
  name: startCase(name),
  version,

  // recommended
  action: {
    default_popup: "src/pages/popup/index.html"
  },
  description,
  icons: {
    "16": "assets/icon-16.png",
    "48": "assets/icon-48.png",
    "128": "assets/icon-128.png"
  },

  // optional
  background: {
    service_worker: "src/scripts/sw.ts",
    type: "module"
  },
  permissions: ["activeTab", "storage"]
});
