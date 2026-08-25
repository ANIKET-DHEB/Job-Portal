import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import SavedJobsProvider from "./context/SavedJobsContext";
import ThemeProvider from "./context/ThemeContext";

import App from "./App";

import "./index.css";
import "./styles/DarkMode.css";

function PWAInstallHandler() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent Chrome from showing its automatic prompt
      event.preventDefault();

      // Save the install prompt
      window.deferredPrompt = event;

      console.log("✅ PWA install prompt available");
    };

    const handleAppInstalled = () => {
      console.log("✅ Job Portal app installed");

      // Remove saved prompt after installation
      window.deferredPrompt = null;
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  return null;
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>

      <ThemeProvider>

        <SavedJobsProvider>

          <PWAInstallHandler />

          <App />

        </SavedJobsProvider>

      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);