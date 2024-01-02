import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/header/Header";
import { Router } from "./components/router/Router";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/footer/Footer";
import { AuthWrapper } from "./components/authorization/AuthWrapper";

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <BrowserRouter>
            <>
                <CssBaseline />
                <ThemeProvider theme={defaultTheme}>
                    <AuthWrapper>
                        <Header />
                        <Router />
                        <Footer />
                    </AuthWrapper>
                </ThemeProvider>
            </>
        </BrowserRouter>
    </React.StrictMode>
);
