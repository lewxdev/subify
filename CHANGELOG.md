# Changelog

All notable changes to this project should be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and generally adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2023-03-29

### Added
- `CHANGELOG.md` file, following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
format.
- `.editorconfig` and `.prettierrc` files, to keep code style consistent.
- programmatic manifest generation and dynamic development server (using
[@crxjs/vite-plugin](https://crxjs.dev/vite-plugin/)).
- `useChromeStorageWithReducer()` hook, to allow for more complex state
management.
- `useEmailAddresses()`, which makes use of the new reducer-based hook to
store and interact with *multiple* email addresses.
- the use of an Autocomplete component, to allow for selecting one of
potentially multiple stored email addresses.
- a footer to the Popup component, to display the current extension version,
link to the GitHub repository, and attribution for the free icon.
- the option to save an email address as the default, (which will be used
as a fallback when deleting the last selected, and the preferred for autofill
[unimplemented]).
- CI/CD pipeline using GitHub Actions, to automatically build and publish
releases of the extension to the Chrome Web Store. As outlined in
[this article](https://jam.dev/blog/automating-chrome-extension-publishing/).

### Changed
- `README.md` file, to reflect the changes made to the project.
- development environment to use [pnpm](https://pnpm.js.org/) (instead of
[npm](https://www.npmjs.com/)) and [Vite.js](https://vitejs.dev/) (instead of
[CRA](https://create-react-app.dev/)).
- source code to rely on [TypeScript](https://www.typescriptlang.org/) over
vanilla JavaScript.
- project structure for improved organization and scalability.
- `useChromeStorage()` to `useChromeStorageWithState()` to differentiate it from
the new reducer-based hook. It also now:
  - makes use of `useRef()` to store the current storage value, instead of
  `useState`, to avoid unnecessary re-renders.
  - makes full use of TypeScript generics to support any type of storage value.
- Alert component is now wrapped in a `Context.Provider` to allow access to
component methods from anywhere in the Popup component tree.
- **BREAKING CHANGE**: hashing algorithm used to generate the resulting email
subaddress has been changed from `sha256` to `alder32`, to negate potential
collisions when slicing.

### Removed
- `package-lock.json` file, as it is no longer needed.
- AppBar component from the Popup component, as it was not providing any
additional, relevant information or functionality.

### Fixed
- styling of the details table in the Popup component for consistent spacing
and alignment.
