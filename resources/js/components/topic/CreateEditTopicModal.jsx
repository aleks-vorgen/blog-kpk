import { Box, Button, TextField } from "@mui/material";
import ModalCustom from "../shared/ModalCustom";
import { createTopic, updateTopic } from "../services/TopicService";
import { useEffect, useState } from "react";

export default function CreateEditTopic({ open, onClose, onSuccess, topic }) {
    const [formData, setFormData] = useState({
        name: topic?.name || "",
    });

    useEffect(() => {
        setFormData({
            name: topic?.name || "",
        });
    }, [topic]);

    const onCreateEditTopic = (event) => {
        event.preventDefault();
        const { name } = formData;

        if (topic) {
            updateTopic(topic.id, name)
                .then((resp) => {
                    console.log("resp", resp);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            createTopic(name).then(
                (topic) => console.log("topic", topic),
                onSuccess(topic)
            );
        }
        onClose();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <ModalCustom name="Create new topic" open={open} onClose={onClose}>
            <Box
                component="form"
                onSubmit={onCreateEditTopic}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
