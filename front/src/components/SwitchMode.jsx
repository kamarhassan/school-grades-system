import Button from "@mui/material/Button";

export default function SwitchMode({ mode, toggleTheme }) {
  return (
    <Button variant="contained" onClick={toggleTheme}>
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
}