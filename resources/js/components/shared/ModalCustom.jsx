import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
} from "@mui/material";

export default function ModalCustom({ title, open, onClose, children }) {
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
                    <strong>{title}</strong>
                </DialogTitle>
            </Stack>
            <DialogContent sx={{ py: 0 }}>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
