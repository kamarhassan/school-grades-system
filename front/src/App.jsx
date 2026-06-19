import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwitchMode from "./components/SwitchMode";

function App({ mode, toggleTheme }) {
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <h1>React + MUI Theme</h1>

      <SwitchMode mode={mode} toggleTheme={toggleTheme} />
    </Box>
  );
}

export default App;