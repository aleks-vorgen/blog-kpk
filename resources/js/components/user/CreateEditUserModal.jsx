import { Box, Button, Grid, TextField } from "@mui/material";
import ModalCustom from "../shared/ModalCustom";
import { editUser, getUser } from "../services/UserService";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

export default function CreateEditUserModal({ open, onClose, user }) {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        image: user?.image || null,
        password: user?.password || "",
    });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            image: user?.image || null,
            password: user?.password || "",
        });
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === "image" && files.length) {
            const imageFile = files[0];
            setFormData((prevData) => ({
                ...prevData,
                [name]: imageFile,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const onCreateEditHandler = (event) => {
        event.preventDefault();

        if (user.id) {
            const id = user.id;

            const newFormData = new FormData();
            newFormData.append("name", formData.name);
            newFormData.append("email", formData.email);

            if (formData.image) {
                newFormData.append("image", formData.image);
            }

            editUser(id, newFormData);
        } else {
            console.log("create user");
        }

        onClose();
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
                                onChange={handleInputChange}
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
