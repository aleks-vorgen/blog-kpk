import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { login } from "../../services/UserService";
import { useContext, useState } from "react";
import { Alert } from "@mui/material";
import UserContext from "../../context/UserContext";

export default function SignIn({ onClose }) {
    const [error, setError] = useState("");
    const { setUser } = useContext(UserContext);

    const onLoginHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
        login(email, password)
            .then((resp) => {
                setUser(resp.data);
                const authToken = resp.data.auth_token;
                localStorage.setItem("auth_token", authToken);
                onClose();
            })
            .catch((error) => {
                console.log("error", error);
                if (error.response.status === 401) {
                    setError(() => "Wrong email or password");
                } else {
                    setError(() => "Oops, something is wrong");
                }
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    component="form"
                    onSubmit={onLoginHandler}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Box>
        </Container>
    );
}
