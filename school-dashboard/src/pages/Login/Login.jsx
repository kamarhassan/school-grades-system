import { Box, Paper } from "@mui/material";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 2,
        }}
      >
        <LoginForm />
      </Paper>
    </Box>
  );
}

export default Login;