import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },

    secondary: {
      main: "#4caf50",
      light: "#66bb6a",
      dark: "#388e3c",
      contrastText: "#fff",
    },

    success: {
      main: "#2e7d32",
    },

    warning: {
      main: "#ed6c02",
    },

    error: {
      main: "#d32f2f",
    },

    info: {
      main: "#0288d1",
    },

    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },

    text: {
      primary: "#212121",
      secondary: "#616161",
    },

    divider: "#e0e0e0",
  },

  typography: {
    fontFamily: `"Roboto", "Cairo", sans-serif`,

    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },

    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },

    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },

    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },

    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },

    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },

    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
    },

    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },

    body1: {
      fontSize: "1rem",
    },

    body2: {
      fontSize: "0.875rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 8,

  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.12)",
    "0px 2px 6px rgba(0,0,0,0.14)",
    "0px 4px 12px rgba(0,0,0,0.15)",
    "0px 6px 18px rgba(0,0,0,0.16)",
    ...Array(20).fill("0px 8px 24px rgba(0,0,0,0.12)"),
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f7fb",
          margin: 0,
          padding: 0,
        },

        "*": {
          boxSizing: "border-box",
        },

        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          height: 42,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
  },
});

export default theme;