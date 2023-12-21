import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import ModalCustom from "../shared/ModalCustom";

const options = ["Option 1", "Option 2"];

export default function CreateEditPost({ open, onClose }) {
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState("");

    return (
        <ModalCustom title="Create new post" open={open} onClose={onClose}>
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
        </ModalCustom>
    );
}
