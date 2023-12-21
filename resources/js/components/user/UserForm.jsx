import { Box, Button, Grid, TextField } from "@mui/material";

export default function UserForm() {
    return (
        <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
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
                        label="Full Name"
                        autoFocus
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
