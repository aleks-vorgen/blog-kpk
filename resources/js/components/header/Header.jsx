import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LogoIcon from "../icons/LogoIcon.png";
import UserContext from "../context/UserContext";

export default function Header() {
    const { user, setUser, openAuthModal } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        setUser(null);
        navigate("./");
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
                        {user && (
                            <>
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
                                {user.role === "admin" && (
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
                                )}
                            </>
                        )}

                        {user ? (
                            <Button
                                variant="outlined"
                                size="small"
                                color="inherit"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                size="small"
                                color="inherit"
                                onClick={openAuthModal}
                            >
                                Sign in
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {/* {showAuthModal && (
                <AuthModal open={showAuthModal} onClose={closeAuthModal} />
            )} */}
        </>
    );
}
