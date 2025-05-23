import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(<App />);
