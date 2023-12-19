import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AuthModal } from "../modals/AuthModal";
import { Link } from "react-router-dom";
import { useState } from "react";

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
                        Sport
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
