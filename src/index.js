import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./cartComtext";
import ErrorBoundary from "./ErrorBoundary";
ReactDOM.render(
  <ErrorBoundary>
    <Router>
      {" "}
      <CartProvider>
        {" "}
        <App />
      </CartProvider>
    </Router>
  </ErrorBoundary>,
  document.getElementById("root")
);
