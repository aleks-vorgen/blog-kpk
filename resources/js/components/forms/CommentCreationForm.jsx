import { Button, TextField, Typography } from "@mui/material";

export default function CommentCreationForm({ onClose }) {
    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                Leave a comment
            </Typography>
            <TextField
                id="outlined-multiline-flexible"
                label="Your text"
                fullWidth
                multiline
                maxRows={10}
            />
            <Button variant="contained" sx={{ mt: 2 }}>
                Post Comment
            </Button>
            {onClose && (
                <Button
                    variant="outlined"
                    sx={{ mt: 2, ml: 1 }}
                    onClick={onClose}
                >
                    Cancel
                </Button>
            )}
        </>
    );
}
