import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import SavedJobsProvider from "./context/SavedJobsContext";
import ThemeProvider from "./context/ThemeContext";

import App from "./App";
import "./index.css";
import "./styles/DarkMode.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SavedJobsProvider>
          <App />
        </SavedJobsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);