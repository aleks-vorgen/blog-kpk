import { Box, Button, TextField } from "@mui/material";
import ModalCustom from "../shared/ModalCustom";
import { createTopic, updateTopic } from "../services/TopicService";
import { useEffect, useState } from "react";

export default function CreateEditTopic({ open, onClose, onSuccess, topic }) {
    const [formData, setFormData] = useState({
        title: topic?.name || "",
    });

    useEffect(() => {
        setFormData({
            title: topic?.name || "",
        });
    }, [topic]);

    const onCreateEditTopic = (event) => {
        event.preventDefault();
        const { title } = formData;

        if (topic) {
            topic.name = title;
            updateTopic(topic.id, topic)
                .then(() => {
                    console.log("success");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            createTopic(title).then((topic) => console.log("topic", topic),onSuccess(topic));
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
        <ModalCustom title="Create new topic" open={open} onClose={onClose}>
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
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    value={formData.title}
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
