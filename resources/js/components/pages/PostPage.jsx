import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import PostCard from "../post/PostCard";
import { Box, Divider, List } from "@mui/material";
import DeleteModal from "../shared/DeleteModal";
import CommentCreationForm from "../comment/CommentCreationForm";
import CommentCard from "../comment/CommentCard";
import React, { useState } from "react";

const comments = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function PostPage() {
    const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
        useState(false);
    const [isReplyCommentOpen, setIsReplyCommentOpen] = useState(false);

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
                            <React.Fragment key={comment}>
                                <CommentCard
                                    comment={comment}
                                    onDelete={onDeleteCommentModalOpen}
                                    onReply={onReplyCommentOpen}
                                />
                                {isReplyCommentOpen && (
                                    <Box sx={{ ml: 9, mb: 2 }}>
                                        <CommentCreationForm
                                            onClose={onReplyCommentClose}
                                        />
                                    </Box>
                                )}
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
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
