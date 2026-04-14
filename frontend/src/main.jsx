import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="198654032070-mad6c0nqrodgu395degop2correr2dr9.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);