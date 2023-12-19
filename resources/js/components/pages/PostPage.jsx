import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import PostCard from "../post/PostCard";
import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import { DeleteModal } from "../modals/DeleteModal";
import CommentCreationForm from "../forms/CommentCreationForm";

const comments = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function PostPage() {
    const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
        React.useState(false);
    const [isReplyCommentOpen, setIsReplyCommentOpen] = React.useState(false);

    const onDeleteCommentModalOpen = () => {
        setIsDeleteCommentModalOpen(() => true);
    };

    const onDeleteCommentModalClose = () => {
        setIsDeleteCommentModalOpen(() => false);
    };

    const onReplyCommentOpen = () => {
        setIsReplyCommentOpen(() => true);
    };

    const onReplyCommentClose = () => {
        setIsReplyCommentOpen(() => false);
    };

    return (
        <Container sx={{ py: 2, pt: 10, justifyContent: "center" }} spacing={2}>
            <Grid
                container
                spacing={4}
                sx={{ py: 2, justifyContent: "center" }}
            >
                <Grid item xs={4}>
                    <Box>
                        <PostCard />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <CommentCreationForm />
                    <List
                        sx={{
                            width: "100%",
                            mt: 2,
                        }}
                    >
                        {comments.map((comment) => (
                            <>
                                <ListItem
                                    alignItems="flex-start"
                                    secondaryAction={
                                        <>
                                            <Tooltip
                                                title="Delete"
                                                placement="top"
                                            >
                                                <IconButton
                                                    aria-label="comment"
                                                    onClick={
                                                        onDeleteCommentModalOpen
                                                    }
                                                >
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Reply"
                                                placement="top"
                                            >
                                                <IconButton
                                                    aria-label="comment"
                                                    onClick={onReplyCommentOpen}
                                                >
                                                    <MessageIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="/static/images/avatar/1.jpg"
                                        />
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
                                                {
                                                    " — I'll be in your neighborhood doing errands this…"
                                                }
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    05/06/2022
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {isReplyCommentOpen && (
                                    <Box sx={{ ml: 9, mb: 2 }}>
                                        <CommentCreationForm
                                            onClose={onReplyCommentClose}
                                        />
                                    </Box>
                                )}
                                <Divider variant="inset" component="li" />
                            </>
                        ))}
                    </List>
                    <DeleteModal
                        open={isDeleteCommentModalOpen}
                        onClose={onDeleteCommentModalClose}
                        // onDelete={onDeleteHandler}
                        title={`Delete comment?`}
                        description={`Do you want to delete this comment?`}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
