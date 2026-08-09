# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


## Frontend Architecture Summary — Weather Forecast & Alert System
The frontend was rebuilt using React.js, adopting a component-based architecture to replace the static HTML/CSS/JS version from the previous assignment. The application is structured into small, reusable components (SearchBar, WeatherCard, AlertBox, Forecast), each responsible for a single piece of the UI. This follows the React principle of separation of concerns, making the code easier to maintain and extend.
State management is handled using React Hooks, specifically useState. The weather data is stored as state inside the Home page component and passed down to child components via props — a pattern known as "lifting state up." When the user searches for a city, the SearchBar component triggers a callback function that updates the shared state, causing React to automatically re-render all components that depend on that data.
Navigation between pages was implemented using React Router (react-router-dom). The application currently has two routes: / (Home, the weather dashboard) and /about (project information). Client-side routing was used, allowing page transitions without full browser reloads, which improves performance and user experience.
Currently, weather data is simulated using mock data, since API integration is planned for the next phase of the project. The architecture is designed so that replacing the mock data with real API calls (using Axios or Fetch) will require minimal changes — only the data-fetching logic inside Home.jsx needs to be updated, while all components remain unchanged.