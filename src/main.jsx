import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import faviconUrl from "/assets/images/favicons.png?url";

// Inject favicon from the bundled asset so it resolves under the deploy base.
const favicon = document.createElement("link");
favicon.rel = "shortcut icon";
favicon.type = "image/png";
favicon.href = faviconUrl;
document.head.appendChild(favicon);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
