# React MV3 Chrome Extension #
This project was initialized from a Create React App (CRA) template and boilerplate code for rapid development of Manifest V3 Chrome extensions. [Learn more about this template](https://github.com/lewxdev/cra-template-mv3-chrome-extension).

## Dependencies ##
*Optional*
+ [`@mui/material`](https://mui.com/) Alongside its sibling dependencies (`@emotion/styled`, `@emotion/react`), MUI provides an optional UI framework for rapid development of interfaces such as popups and option pages.

*Development*
+ [`@craco/craco`](https://www.npmjs.com/package/@craco/craco) Allows modification of the webpack configuration used to compile the extension (enabling additional features for chrome scripts and direct communication with react components)
+ [`@types/chrome`](https://www.npmjs.com/package/@types/chrome) Provides autocomplete/intellisense for the `chrome` global during development of chrome scripts
+ [`nodemon`](https://www.npmjs.com/package/nodemon) Allows realtime development of extension components (found at `@chrome/`) to rebuild the extension. By default the build delay is 10s, this can be changed in the `nodemonConfig` key in the `package.json`

## Usage ##
On creation of a new react app using this template, follow these steps to start developing an MV3 Chrome extension:

*Setup*
1. Immediately run `npm run build`, this will create a build at `extension/`
2. Navigate to [the Extensions page](chrome://extensions) in Chrome
3. Ensure **"Developer mode"** is enabled (top right) and select **"Load unpacked"**
4. Select the `extension/` directory built from step 1
5. Now you can start hacking!

*Scripts*
+ `npm run start` start a development server for building UI components/interfaces
+ `npm run build` create a production build from all existing changes

**NOTE** `npm run test` is disabled by default as it is untested.
