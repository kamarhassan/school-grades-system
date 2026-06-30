import { useState } from "react";
import {
    Stack,
    Typography,
    TextField,
    Button,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../auth/context/AuthContext"


import CheckIcon from '@mui/icons-material/Check';

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // await login(form);
  const response = await login(form);

        console.log("LOGIN RESPONSE:", response);
        console.log("TOKEN IN STORAGE:", localStorage.getItem("token"));

            navigate("/", { replace: true });

        } catch (error) {
            // console.error(error);
            setError("بيانات الدخول غير صحيحة");

        } finally {
            setLoading(false);
        }
    };

    return (

        <form onSubmit={handleSubmit}>
          
                <Stack spacing={3}>

                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert
                            icon={<CheckIcon fontSize="inherit" />}
                            severity="success"
                        >
                            {success}
                        </Alert>
                    )}


                    <Typography variant="h5" textAlign="center">
                        Login
                    </Typography>

                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>

                </Stack>
        </form>
    );
}

export default LoginForm;