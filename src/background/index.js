import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://dbbac6e100e34aa9bb4d0a8fe7a22ffe@sentry.sparkling.land/5",
  environment: _VARS_.ENV,
  allowUrls: [
    /extensions\//i,
    /^chrome:\/\//i
  ],
  release: "extension-background@" + _VARS_.VERSION
});

ReactDOM.render(
  <App />,
  document.getElementById("app")
);