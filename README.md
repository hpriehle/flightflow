# Flight Flow Chrome Extension

Flight Flow is a Chrome extension that allows users to easily capture flight data from Google Flights pages.

## Installation

1. Clone this repository or download the ZIP file and extract it.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to a Google Flights page (https://www.google.com/travel/flights).
2. Click on the Flight Flow extension icon in your browser toolbar.
3. Click the "Add Flight" button to scrape the current flight data.
4. The scraped data will be sent to your specified webhook URL (if configured).

## Options

To configure the extension:

1. Right-click on the Flight Flow icon in your browser toolbar.
2. Select "Options" from the menu.
3. Enter your webhook URL and select your preferred theme.
4. Click "Save Options" to apply the changes.

## Privacy Policy

Flight Flow collects and processes the following data:

- Flight details (price, airports, dates, times, airlines, and flight numbers) from Google Flights pages you visit.
- The webhook URL you provide in the options.

This data is used solely for the purpose of capturing flight information and sending it to your specified webhook. We do not store or share this data with any third parties.

## Development

To modify or extend the extension:

1. Make changes to the relevant files (manifest.json, popup.html, content.js, etc.).
2. Reload the extension on the `chrome://extensions` page.
3. Test your changes by using the extension on Google Flights pages.

## Version Checking

The extension includes a simple version checking mechanism. When updated, users will receive a notification about the new version and be prompted to check for new features in the options page.

## Performance

Flight Flow is designed to be lightweight and should not significantly impact browser performance. The extension only activates on Google Flights pages and performs minimal background tasks.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.