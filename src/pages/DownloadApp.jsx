import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

import "../styles/DownloadApp.css";

function DownloadApp() {
  const [isInstalled, setIsInstalled] = useState(false);

  const {
    needRefresh: [needRefresh],
  } = useRegisterSW();

  useEffect(() => {
    const checkInstalled = () => {
      const standalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;

      const iosStandalone =
        window.navigator.standalone === true;

      setIsInstalled(standalone || iosStandalone);
    };

    checkInstalled();

    window.addEventListener("appinstalled", checkInstalled);

    return () => {
      window.removeEventListener(
        "appinstalled",
        checkInstalled
      );
    };
  }, []);

  const handleInstall = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();

      const { outcome } =
        await window.deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setIsInstalled(true);
      }

      window.deferredPrompt = null;
    } else {
      alert(
        "Please use Chrome menu → Add to Home screen to install the Job Portal app."
      );
    }
  };

  return (
    <div className="download-app-page">

      <div className="download-app-card">

        <img
          src="/pwa-192x192.png"
          alt="Job Portal"
          className="download-app-icon"
        />

        <h1>
          Job Portal
        </h1>

        <p className="download-app-subtitle">
          Find your dream job anytime, anywhere.
        </p>

        {isInstalled ? (

          <div className="download-installed">
            ✅ Job Portal is already installed
          </div>

        ) : (

          <>
            <button
              className="download-install-btn"
              onClick={handleInstall}
            >
              📱 Install Job Portal
            </button>

            <p className="download-help">
              Install the app on your phone for quick
              access to jobs and applications.
            </p>
          </>

        )}

        <div className="download-features">

          <div>
            💼
            <span>
              Browse Jobs
            </span>
          </div>

          <div>
            ❤️
            <span>
              Save Jobs
            </span>
          </div>

          <div>
            📄
            <span>
              Apply Easily
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DownloadApp;