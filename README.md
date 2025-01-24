# QR Code Generator

This is a web-based QR Code Generator built with React and Tailwind CSS. The app allows users to create custom QR codes by entering text or a URL, customize the QR code's colors, and save the generated QR codes to a history for later access.

## Features

- **QR Code Generation**: Enter any text or URL, and the app generates a QR code.
- **Customizable Colors**: Choose QR code and background colors using color pickers.
- **Scan to Test**: If the generated QR code links to a URL, the "Scan to Test" button opens it in a new tab.
- **QR Code History**: View a history of generated QR codes, including the text, timestamp, and download option.
- **Theme Toggle**: Switch between light and dark modes with a theme toggler.
- **Download QR Code**: Download the generated QR code as a PNG file.

## Demo

You can try out the live demo of the QR Code Generator here: [qr-code-generator-for-url.vercel.app](http://qr-code-generator-for-url.vercel.app)

## Technologies Used

- Next.js: React-based framework for building server-side rendered applications.
- React: JavaScript library for building user interfaces.
- Tailwind CSS: Utility-first CSS framework for styling.
- QRCode.js: Library for generating QR codes.
- LocalStorage: For saving QR code history.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/venky0195/qr-code-generator
   ```
2. Navigate to the project folder:

   ```bash
   cd qr-code-generator
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## How to Use

1. Enter the text or URL in the input field.
2. The QR code is generated instantly. You can:
   - Click on the "Scan to Test" button if the QR code points to a URL. It will open the URL in a new tab.
   - Download the QR code as a PNG file using the "Download" button.
3. Choose custom colors for the QR code and background using the color pickers.
4. The generated QR codes are saved in the history section, which you can view, remove, or download.
5. Toggle between light and dark themes using the theme switcher.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. You can also open issues to report bugs or request new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
