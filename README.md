# Real-Time Counter App

This is a simple real-time counter application built with React.js for the frontend and Python for the backend. It allows multiple users to open the app in different tabs and see the counter increment in real-time across all tabs.

## Features

- Real-time counter: Increment the counter by clicking a button.
- Multiple tab support: All tabs update to the same counter value when incremented.
- Backend implementation: Counter logic handled on the server-side.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Python
- **Real-Time Communication:** Server Side Events (SSE)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amarnathcjd/synctab.git

   cd synctab
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the Backend server:

   ```bash
   python3 main.py
   ```

4. Start the Frontend server:

   ```bash
    npm start
   ```

5. Replace backend URL in `src/App.js` with your server URL:

   ```javascript
   const SERVER_URL = "http://localhost:5000";
   ```

## Live Demo

The application is deployed on Vercel. You can access it [here](https://sync-tab.vercel.app/).
<br>Backend server is deployed on [Koyeb](https://gogramdocs-amarnathcjd.koyeb.app).

## License

This project is open-source and available under the [MIT License](LICENSE).
