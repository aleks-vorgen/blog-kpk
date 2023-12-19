import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

export const CreateEditTopic = ({ open, onClose }) => {
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
                <DialogTitle
                    sx={{ pt: 2, pb: 0, fontSize: "24px" }}
                    color="primary"
                >
                    <strong>Create new topic</strong>
                </DialogTitle>
            </Stack>
            <DialogContent sx={{ py: 0 }}>
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
