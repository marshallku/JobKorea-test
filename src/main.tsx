import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import worker from "./mocks/browser";
import "./index.css";

// FIXME: Worker starts even import.meta.env.DEV is false
worker.start();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
