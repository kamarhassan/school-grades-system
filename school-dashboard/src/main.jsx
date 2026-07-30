import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, CssBaseline } from "@mui/material";
// import rtlPlugin from "@mui/stylis-plugin-rtl";

import App from "./App";
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import { SnackbarProvider } from 'notistack'; // ✅ الصحيح


ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
        >
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </SnackbarProvider>
    </ThemeProvider>,
);

/*


import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

// 1. Import the Emotion Cache tools
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";

import App from "./App";
import theme from "./theme/theme";
import { AuthProvider } from "./auth/context/AuthContext";

// 2. Create the RTL Cache instance
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// 3. Set the HTML document direction globally to RTL
document.dir = "rtl";

ReactDOM.createRoot(document.getElementById("root")).render(
  // 4. Wrap everything in the CacheProvider
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </CacheProvider>
);
*/
