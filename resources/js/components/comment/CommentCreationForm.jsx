import { Button, TextField, Typography } from "@mui/material";
import { createComment } from "../services/CommentService";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function CommentCreationForm({
    article,
    onClose,
    onCommentCreated,
}) {
    const [text, setText] = useState("");
    const { user } = useContext(UserContext);

    const onCreateComment = async (event) => {
        event.preventDefault();

        onCommentCreated?.({
            text,
            article_id: article?.id,
            user_id: user?.id,
        });
        setText("");
        onClose?.();
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

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
                value={text}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={onCreateComment}
            >
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
