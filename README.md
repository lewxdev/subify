<div align="center">
  <br />
  <img alt="Subify logo" height="60" src="./assets/logo.png" />
  <br />
  <br />
  <a href="https://chrome.google.com/webstore/detail/mkjgbogdoogelppeoecjeidjljhhbcdg">
    <img
      alt="Chrome Web Store (version)"
      src="https://img.shields.io/chrome-web-store/v/mkjgbogdoogelppeoecjeidjljhhbcdg?style=flat-square" />
  </a>
  <img
    alt="Chrome Web Store (users)"
    src="https://img.shields.io/chrome-web-store/users/mkjgbogdoogelppeoecjeidjljhhbcdg?style=flat-square" />
</div>

---

Subify is a web extension for Google Chrome[^1] that enables users to create
unique [subaddresses](https://en.wikipedia.org/wiki/Email_address#Subaddressing)
for each website they visit (done by using the
[adler-32](https://en.wikipedia.org/wiki/Adler-32)[^2] checksum of the
[host](https://developer.mozilla.org/en-US/docs/Web/API/URL/host) of the active
tab).

This empowers users to more effectively manage their inbox and protect their
privacy. Useful when providing an email address to a website that may be
suspicious or known for sending unwanted mail. Using subaddresses in this way
makes it easy to determine the source of emails and create filters to block
specific emails without unsubscribing (which often relies on 3rd-party services
that likely provide a non-intuitive interface).

Built with ♥️ and TypeScript :)

## Contributing

Contributing is welcome, just be sure to fork the package repository and submit
a pull request on your changes.

## Dependencies

The extension requires a few dependencies for the UI and functionality.

- [`@mui/material`](https://mui.com/) - Used as the framework for visual
  components such as the popup, allowing for rapid development of UI.
  (`@emotion/react`, `@emotion/styled`, and `@mui/icons-material` are also
  included)
- [`adler-32`](https://www.npmjs.com/package/adler-32) - Provides the hashing
  function used in the subaddress
- [`lodash`](https://lodash.com/) - While not strictly necessary, this library
  provides a number of useful functions for manipulating strings and objects
- [`react`](https://reactjs.org/) - Serves as the framework for the extension's
  UI (`react-dom` is also included)
- [`zod`](https://zod.dev/) - Provides types, schema, and validation throughout
  the extension

## Permissions

The extension requests only minimal necessary permissions in order to respect
privacy and adhere to the Chrome Web Store's
[updated privacy policy](https://developer.chrome.com/docs/webstore/user_data/).

- [`activeTab`](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/) -
  Allows the extension to retrieve the URL of the currently active tab
- [`storage`](https://developer.chrome.com/docs/extensions/mv3/manifest/storage/) -
  Allows the extension to store the user-provided email address(es)

[^1]:
    Currently only available on the Chrome Web Store, but may be made
    available on the Firefox Add-ons Store in the future.

[^2]:
    Adler-32 was chosen as the checksum function because of it's speed,
    collision-resistance, and length (8 characters).
