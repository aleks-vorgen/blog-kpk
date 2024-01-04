import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { getUser } from "../services/UserService";

export default function CommentCard({ comment, onDelete, onReply }) {
    const { user } = useContext(UserContext);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        getUser(comment.user_id)
            .then((user) => {
                setAuthor(user.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                user && (
                    <>
                        {user.role === "admin" && (
                            <Tooltip title="Delete" placement="top">
                                <IconButton
                                    aria-label="comment"
                                    onClick={() => onDelete(comment.id)}
                                >
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        )}

                        <Tooltip title="Reply" placement="top">
                            <IconButton aria-label="comment" onClick={onReply}>
                                <MessageIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        >
            <ListItemAvatar>
                <Avatar
                    alt={author?.name.charAt(0).toUpperCase()}
                    src={`http://127.0.0.1:8000/api/${author?.image}`}
                />
            </ListItemAvatar>
            <ListItemText
                primary={comment.text}
                secondary={
                    <>
                    <br/>
                        <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {author?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Created at -{" "}
                            {new Date(comment.created_at).toLocaleDateString()}
                        </Typography>
                    </>
                }
                disableTypography
            />
        </ListItem>
    );
}
