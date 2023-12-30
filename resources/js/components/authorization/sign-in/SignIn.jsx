import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { login } from "../../services/UserService";
import axios from "axios";

export default function SignIn() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get("email"),
    //         password: data.get("password"),
    //     });
    // };

    const onLoginHandler = (event) => {
        event.preventDefault();
        // const response = await axios.post(
        //     `http://127.0.0.1:8000/api/user/login?email=sumskoj01@gmail.com&password=asd`
        // );
        axios.post('http://127.0.0.1:8000/api/user/login', {
            email: 'sumskoj01@gmail.com',
            password: 'asd'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        // const authToken = response.data.auth_token;
        // localStorage.setItem("access-token", authToken);
    };

    // const onLoginHandler = (event) => {
    //     event.preventDefault();
    //     // try {
    //     console.log("event.currentTarget", event.currentTarget);
    //     const data = new FormData(event.currentTarget);
    //     const response = await login(data.get("email"), data.get("password"));
    //     localStorage.setItem("access-token", response.data.accessToken);
    //     // setUser(response.data.user);
    //     // } catch (error) {
    //     //     if (error.response.status === 401) {
    //     //         setError(() => "Wrong email or password");
    //     //     } else {
    //     //         setError(() => "Oops, something is wrong");
    //     //     }
    //     // }
    // };

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
                </Box>
            </Box>
        </Container>
    );
}
