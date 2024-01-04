import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ModalCustom from "../shared/ModalCustom";
import { createArticle, updateArticle } from "../services/ArticleService";
import { getTopic, getTopics } from "../services/TopicService";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function CreateEditPost({
    open,
    onClose,
    setOwnArticles,
    article,
}) {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [articleTopic, setArticleTopic] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        title: article?.title || "",
        description: article?.description || "",
        tag: article?.tag || "",
        image: article?.image || null,
        topic_id: article?.topic_id || null,
        user_id: user?.id, // Add user_id to formData
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
            topic_id: article?.topic_id || null,
            user_id: user?.id,
        });

        getTopic(article?.topic_id)
            .then((topic) => {
                setArticleTopic(() => topic.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [article, user?.id]);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === "image" && files.length) {
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

        // Check for required fields
        if (
            !formData.title ||
            !formData.description ||
            !formData.tag ||
            !formData.topic_id ||
            !formData?.user_id
        ) {
            console.error("Required fields are missing");
            return;
        }

        const newFormData = new FormData();
        newFormData.append("title", formData.title);
        newFormData.append("description", formData.description);
        newFormData.append("tag", formData.tag);
        newFormData.append("topic_id", formData.topic_id);
        newFormData.append("user_id", formData?.user_id);

        // Add other fields like image if needed
        if (formData.image) {
            newFormData.append("image", formData.image);
        }

        try {
            if (article) {
                // Update existing article
                const response = await updateArticle(article.id, newFormData);
                setOwnArticles((prev) =>
                    prev.map((old) =>
                        article.id != old.id ? old : response.data
                    )
                );
                console.log("Updated article:", response);
            } else {
                // Create a new article
                const response = await createArticle(newFormData);
                setOwnArticles((prev) => prev.concat(response.data));
                console.log("Created article:", response);
            }
        } catch (error) {
            console.error("Error creating/updating article:", error);
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
                    value={formData.title}
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
                    value={formData.description}
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
                    value={formData.tag}
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
                    // value={formData.image}
                    onChange={handleInputChange}
                />

                <Autocomplete
                    fullWidth
                    value={selectedTopic ? selectedTopic : articleTopic}
                    onChange={(event, newValue) => {
                        setSelectedTopic(newValue);
                        // Set topic_id in formData when selecting a topic
                        setFormData((prevData) => ({
                            ...prevData,
                            topic_id: newValue ? newValue.id : null,
                        }));
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
