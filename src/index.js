import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WatchlistContextProvider } from "./store/watchlist-context";
import App from "./App";
import "./Index.css";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <WatchlistContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WatchlistContextProvider>
);
