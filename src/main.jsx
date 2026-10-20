import React from "react";
import ReactDOM from "react-dom/client";
import "./portfolio.css";
import App from "./Portfolio";

const root = document.getElementById("app");
if (root.querySelector("main")) ReactDOM.hydrateRoot(root, <App />);
else ReactDOM.createRoot(root).render(<App />);
