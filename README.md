# Signup Subaddressing #

# About #
This Chrome Extension creates a unique [subaddress](https://en.wikipedia.org/wiki/Email_address#Subaddressing)
for the current active tab (given the user has provided a valid email address).
This is done by retrieving the active tab URL, performing a hash on its [host](https://developer.mozilla.org/en-US/docs/Web/API/URL/host)
and creating a unique subaddress using the first eight characters of the hash as
the tag.

For example, this is useful in circumstances where the user is hesitant to give
out their email address to a suspicious website or a certain website is known
for sending unwanted mail. Using subaddresses in this way makes it easy to clear
email inboxes by blocking emails sent to some subaddress rather than
unsubscribing (which relies on the services' servers and may provide a non-
intuitive interface)

## Permissions ##
The extension requests only minimal necessary permissions in order to respect
privacy and adhere to [the Web Store's updated privacy policy](https://developer.chrome.com/docs/webstore/user_data/)

+ [`activeTab`](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/) -
Allows the extension to retrieve the URL of the currently active tab
+ [`storage`](https://developer.chrome.com/docs/extensions/reference/storage/) -
Allows the extension to store the user-provided email address (which is parsed
into the resulting subaddress)

## Dependencies ##
In development, the extension requires a few dependencies for the UI and
functionality.

* [`@mui/material`](https://mui.com/) - Used as the framework for visual
components such as the popup, allowing for rapid development of UI.
(`@emotion/react`, `@emotion/styled`, and `@mui/icons-material` are also
included)
* [`alder-32`](https://www.npmjs.com/package/alder-32) - Provides the hashing
function used in the subaddress
* [`lodash`](https://lodash.com/) - While not strictly necessary, this library
provides a number of useful functions for manipulating strings and objects
* [`react`](https://reactjs.org/) - Serves as the framework for the extension's
UI (`react-dom` is also included)
* [`zod`](https://zod.dev/) - Provides types, schema, and validation throughout

## Contributing ##
Contributing is welcome, just be sure to fork the package repository and submit
a pull request on your changes.
