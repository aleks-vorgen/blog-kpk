import AppBar from "@mui/material/AppBar";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AuthModal from "../authorization/AuthModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoIcon from "../icons/LogoIcon.png";

export default function Header() {
    const [showAuthModal, setShowAuthModal] = useState(false);

    const openAuthModal = () => {
        setShowAuthModal(true);
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        overflowX: "auto",
                    }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            color: "inherit",
                            mr: 2,
                        }}
                    >
                        <Box sx={{ height: 45 }}>
                            <img
                                src={LogoIcon}
                                alt="Logo"
                                height="100%"
                                width="100%"
                            />
                        </Box>
                    </Typography>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            noWrap
                            component={Link}
                            to="/profile"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                mr: 2,
                            }}
                        >
                            Profile
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            noWrap
                            component={Link}
                            to="/admin"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                mr: 2,
                            }}
                        >
                            Admin
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            color="inherit"
                            onClick={openAuthModal}
                        >
                            Sign in
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {showAuthModal && (
                <AuthModal open={showAuthModal} onClose={closeAuthModal} />
            )}
        </>
    );
}
