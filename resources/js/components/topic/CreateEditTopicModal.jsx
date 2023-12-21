import {
    Box,
    Button,
    TextField,
} from "@mui/material";
import ModalCustom from "../shared/ModalCustom";

export default function CreateEditTopic({ open, onClose }) {
    return (
        <ModalCustom title="Create new topic" open={open} onClose={onClose}>
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
        </ModalCustom>
    );
}
