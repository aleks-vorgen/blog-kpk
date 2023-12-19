import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export const DeleteModal = ({
    open,
    onClose,
    onDelete,
    title,
    description,
}) => {
    return (
        <Dialog
            open={open}
            onClick={onClose}
            maxWidth="sm"
            PaperProps={{
                sx: { borderRadius: 2, px: 2, py: 2 },
            }}
        >
            <DialogTitle
                variant="h5"
                sx={{ display: "flex", alignItems: "center", px: 1 }}
            >
                <IconButton>
                    <Delete fontSize="large" color="error" />
                </IconButton>
                <Typography variant="title" color="text.primary">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 1 }}>
                    <Typography color="text.primary">
                        {description}{" "}
                        <strong> This process cannot be undone!</strong>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={onDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
