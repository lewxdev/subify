# Changelog

All notable changes to this project should be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and generally adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2024-10-15

### Added

- add autofill enabled by new permissions ([`contextMenus`](https://developer.chrome.com/docs/extensions/reference/api/contextMenus) and [`scripting`](https://developer.chrome.com/docs/extensions/reference/api/scripting)), input fields can be filled for the selected email from the context menu
- add presets for custom, domain, and timestamp, select a preset from the new popup generate tab to use different details in the generated alias (all presets are persisted for convenience)
- add history to keep track of generated aliases (copying and autofilling appends to the history), manage history from the new popup history tab
- add settings for associating an email address any single-character separator (`+` by default, resolving #1), manage email addresses and separators from the popup settings tab

### Changed

- **BREAKING CHANGE**: change storage schemas and keys, users will need to re-add their emails (may make these recoverable in the future)
- move email address configuration from default popup tab to settings tab to support separators and make entry more intuitive
- change the footer to read "star on GitHub!" from "See the open source code on GitHub" a shorter, more universal, call-to-action

### Removed

- remove domain obfuscation: aliases can be dot-separated and provides more clarity to the user and less technical overhead (see [this Google Help Center article](https://support.google.com/mail/answer/22370?hl=en#alias&zippy=%2Cfilter-using-your-gmail-alias))
- remove default email: persisting the selected email is all that is necessary to provide a streamlined user experience, honestly don't even know why this option was added...
- remove visual feedback (alert): tweak the design to opt for more subtle forms of visual feedback instead of the layout-changing alert

### Fixed

- update readme brand images to support light/dark theme switching

## [2.0.0] - 2023-04-01

### Added

- add option to add multiple email addresses, entries can be added and deleted from the input field of the popup
- add default email address, this email will be used as a fallback when deleting the last selected email, and the preferred email for autofill (unimplemented)
- add footer to the popup to display the current extension version and link to the GitHub repository
- add promotional images for the web store listing (see [the documentation](https://developer.chrome.com/docs/webstore/images/))

### Changed

- **BREAKING CHANGE**: change algorithm from `sha256` hash to `adler32` checksum of the host, a shorter, faster, and potentially more collision-resistant alternative.
- change the layout of the details table: move the subaddress closer to the input field and rename row "url" to "site"
- update extension name and branding from "Signup Subaddressing" to "Subify", to improve discoverability and general recognition
- update screenshots for the web store listing
- change all content to be un-selectable to polish the experience and reduce unintended selections

### Removed

- remove app bar from the popup, it was not providing any additional relevant information or functionality
- remove input label in favor of a minimal placeholder
- remove "save" button, since multiple email addresses are now supported, "save" may no longer be accurate in all instances
- remove underline of the subaddress tag

## [1.0.0] - 2022-01-01

### Added

- add popup as the main entrypoint of the extension
- add input field to add and edit a valid email address, persisted to `storage`
- add info table showing the current url and parsed email subaddress (a hash of the current url)
- add button to copy the currently parsed email subaddress
- add alert as visual feedback for operations (save, copy, etc.)
