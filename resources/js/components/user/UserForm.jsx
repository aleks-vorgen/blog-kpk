import { Box, Button, Grid, TextField } from "@mui/material";
import { editUser } from "../services/UserService";
import { useEffect, useState } from "react";

export default function UserForm({ user }) {
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        image: user?.image,
    });

    useEffect(() => {
        setFormData({
            name: user?.name,
            email: user?.email,
            image: user?.image,
        });
    }, [user]);

    const onUpdateUser = (event) => {
        event.preventDefault();
        const id = user.id;

        const newFormData = new FormData();
        newFormData.append("name", formData.name);
        newFormData.append("email", formData.email);

        if (formData.image) {
            newFormData.append("image", formData.image);
        }

        editUser(id, newFormData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Box
            component="form"
            noValidate
            onSubmit={onUpdateUser}
            sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        autoFocus
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
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
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 200 }}
            >
                Submit
            </Button>
        </Box>
    );
}
