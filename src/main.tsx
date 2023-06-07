import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./bootstrap/css/bootstrap.min.css";
import "./assets/layouts/horizontal-light-menu/css/light/plugins.css";
import "./index.css";
import $ from "jquery";
(window as any).$ = (window as any).jQuery = $;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <React.StrictMode>
          <BrowserRouter>
               <App />
          </BrowserRouter>
     </React.StrictMode>,
);
