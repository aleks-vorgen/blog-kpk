import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ModalCustom from "../shared/ModalCustom";
import { createArticle } from "../services/ArticleService";
import { getTopics } from "../services/TopicService";
import UserContext from "../context/UserContext";

export default function CreateEditPost({ open, onClose, setOwnArticles, article }) {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null); // Define selectedTopic state
    const [inputValue, setInputValue] = useState("");
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        title: article?.title || "",
        description: article?.description || "",
        tag: article?.tag || "",
        image: article?.image || null,
    });

    useEffect(() => {
        getTopics()
            .then((topics) => {
                setTopics(() => topics.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setFormData({
            title: article?.title || "",
            description: article?.description || "",
            tag: article?.tag || "",
            image: article?.image || null,
        });
    }, [article]);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === "image" && files.length) {
            // Handle file input separately
            const imageFile = files[0];
            setFormData((prevData) => ({
                ...prevData,
                [name]: imageFile,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const onCreateEditPost = async (event) => {
        event.preventDefault();

        const newFormData = new FormData();
        newFormData.append("title", formData.title);
        newFormData.append("description", formData.description);
        newFormData.append("tag", formData.tag);
        newFormData.append("topic_id", selectedTopic ? selectedTopic.id : null);
        newFormData.append("user_id", user.id);

        if (formData.image) {
            newFormData.append("image", formData.image);
        }

        try {
            const response = await createArticle(newFormData);
            setOwnArticles((prev) => prev.concat(response));
            console.log("article", response);
        } catch (error) {
            console.error("Error creating article:", error);
        }

        onClose();
    };

    return (
        <ModalCustom title="Create new post" open={open} onClose={onClose}>
            <Box
                component="form"
                onSubmit={onCreateEditPost}
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
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="tag"
                    label="Tag"
                    name="tag"
                    autoComplete="tag"
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="image"
                    type="file"
                    id="image"
                    autoComplete="image"
                    onChange={handleInputChange}
                />
                <Autocomplete
                    fullWidth
                    value={selectedTopic}
                    onChange={(event, newValue) => {
                        setSelectedTopic(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={topics}
                    getOptionLabel={(option) => option.name}
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
