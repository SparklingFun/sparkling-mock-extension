import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";
import "./index.sass"

Sentry.init({
  dsn: "https://dbbac6e100e34aa9bb4d0a8fe7a22ffe@sentry.sparkling.land/5",
  environment: _VARS_.ENV,
  allowUrls: [
    /extensions\//i,
    /^chrome:\/\//i
  ],
  release: "extension-option@" + _VARS_.VERSION,
  tracesSampler: samplingContext => {
    if (localStorage.getItem('__SPARKLING_DO_NOT_TRACK__') === 'true') {
      return 0;
    } else {
      return 1;
    }
  }
});

ReactDOM.render(
  <App />,
  document.getElementById("app")
);