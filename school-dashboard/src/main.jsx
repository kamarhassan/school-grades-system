import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import rtlPlugin from "@mui/stylis-plugin-rtl";

import App from "./App";
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
 

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
   <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);