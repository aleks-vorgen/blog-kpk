import { Box, Button, Grid, TextField } from "@mui/material";
import ModalCustom from "../shared/ModalCustom";
import { editUser, getUser } from "../services/UserService";
import { useEffect, useState } from "react";

export default function CreateEditUserModal({ open, onClose, user }) {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: user?.password || "",
    });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            password: user?.password || "",
        });
    }, [user]);

    const onCreateEditHandler = (event) => {
        event.preventDefault();
        const { name, email } = formData;

        if (user.id) {
            const id = user.id;
            editUser(id, name, email);
        } else {
            console.log("create user");
        }

        onClose();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <ModalCustom title="Create new user" open={open} onClose={onClose}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    component="form"
                    noValidate
                    onSubmit={onCreateEditHandler}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                autoFocus
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="image"
                                type="file"
                                id="image"
                                autoComplete="image"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                // required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </ModalCustom>
    );
}
