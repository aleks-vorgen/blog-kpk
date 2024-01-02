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
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function CommentCard({ comment, onDelete, onReply }) {
    const { user } = useContext(UserContext);
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
                                    onClick={onDelete}
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
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <>
                        <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                        <Typography variant="body2" color="text.secondary">
                            05/06/2022
                        </Typography>
                    </>
                }
            />
        </ListItem>
    );
}
