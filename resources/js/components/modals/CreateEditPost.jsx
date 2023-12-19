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

import { useState } from "react";

const options = ["Option 1", "Option 2"];

export const CreateEditPost = ({ open, onClose }) => {
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState("");

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
                    <strong>Create new post</strong>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="tag"
                        label="Tag"
                        name="tag"
                        autoComplete="tag"
                    />
                    {/* <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="date"
                                  type="date"
                                  id="date"
                                  autoComplete="date"
                              /> */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="image"
                        type="file"
                        id="image"
                        autoComplete="image"
                    />
                    <Autocomplete
                        fullWidth
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ mt: 2 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Topic" />
                        )}
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
