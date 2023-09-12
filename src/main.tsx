import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import MainLayout from "./layout/MainLayout.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout >
        <App />
      </MainLayout>
    </BrowserRouter>
  </React.StrictMode>
);
 