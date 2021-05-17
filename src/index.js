import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { firebaseConfig } from "./services/firebase";
import { FirebaseAppProvider } from "reactfire";
import "bootswatch/dist/lumen/bootstrap.min.css";

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById("root")
);

reportWebVitals();
