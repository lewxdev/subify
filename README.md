<div align="center">
  <br />
  <img alt="Subify logo" height="60" src="./assets/brand-dark.png#gh-dark-mode-only" />
  <img alt="Subify logo" height="60" src="./assets/brand-light.png#gh-light-mode-only" />
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

Subify is a browser extension for Google Chrome[^1] that enables you to create
unique [subaddresses](https://datatracker.ietf.org/doc/html/rfc5233) for the
websites you visit. Subaddressing is a feature of most email providers that
allows you to tag your existing email address with additional information (e.g.
`john.doe+my.custom.tag@example.com`). The best part is that emails sent to the
subaddress are delivered to the inbox you already use.

- Manage your inbox with filters and rules based on the subaddress.
- Protect your privacy by providing unique email addresses at sign-up[^2].
- Create test accounts for development and testing.
- Identify the source of spam and unwanted emails.

## Features

- Add multiple email addresses from the Generate tab[^3]
- Choose between presets (e.g. custom, domain, and timestamp).
- Autofill input fields from the right-click context menu.
- Manage copied and autofilled subaddresses from the History tab.

## Permissions

The extension requests only minimal necessary permissions in order to respect
privacy and adhere to the Chrome Web Store's
[updated privacy policy](https://developer.chrome.com/docs/webstore/user_data/).

- [`activeTab`](https://developer.chrome.com/docs/extensions/reference/api/tabs) -
  Allows the extension to retrieve the URL of the currently active tab
- [`contextMenus`](https://developer.chrome.com/docs/extensions/reference/api/contextMenus) -
  Allows the extension to add a context menu item for autofill
- [`scripting`](https://developer.chrome.com/docs/extensions/reference/api/scripting) -
  Allows the extension to autofill input fields on the page
- [`storage`](https://developer.chrome.com/docs/extensions/reference/api/storage) -
  Allows the extension to store functional data (email address(es), history, etc.)

## Contributing

Contributing is welcome! Just fork the repository and submit a pull request.

[^1]:
    Currently only available for Google Chrome and other supported
    Chromium-based browsers, but may be made available for other browsers in the
    future.

[^2]:
    Some websites may sell your email address to third parties, which can lead
    to unsolicited emails. By using subaddressing, you can identify the source
    of the spam and block future emails.

[^3]:
    The extension only supports subaddressing with single-character separators
    (e.g. `+` or `-`). It doesn't support subdomain addressing.
