import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Avatar,
    Stack,
} from "@mui/material";
import SignIn from "../sign-in/SignIn";
import SignUp from "../sign-up/SignUp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const AuthModal = ({ open, onClose }) => {
    const [userRegistered, setUserRegistered] = useState(true);

    const onCloseModal = () => {
        onClose();
        setUserRegistered(true);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll={"paper"}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 },
            }}
        >
            <Stack sx={{ alignItems: "center" }}>
                <Avatar sx={{ mt: 2, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <DialogTitle
                    sx={{ pt: 2, pb: 0, fontSize: "24px" }}
                    color="primary"
                >
                    <strong>{userRegistered ? "Sign in" : "Sign Up"}</strong>
                </DialogTitle>
            </Stack>
            <DialogContent sx={{ py: 0 }}>
                {userRegistered ? (
                    <SignIn onClose={onCloseModal} />
                ) : (
                    <SignUp onClose={onCloseModal} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setUserRegistered((prev) => !prev)}>
                    {userRegistered ? "Sign Up" : "Are you already registered?"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
