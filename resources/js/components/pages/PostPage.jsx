import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import PostCard from "../post/PostCard";
import { Box, Divider, List } from "@mui/material";
import DeleteModal from "../shared/DeleteModal";
import CommentCreationForm from "../comment/CommentCreationForm";
import CommentCard from "../comment/CommentCard";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/ArticleService";
import {
    createComment,
    deleteComment,
    getCommentsByArticle,
} from "../services/CommentService";

export default function PostPage() {
    const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
        useState(false);
    const [isReplyCommentOpen, setIsReplyCommentOpen] = useState(false);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const { user } = useContext(UserContext);
    const { postId } = useParams();
    const [deletedCommentId, setDeletedCommentId] = useState(null);
    const [replyingCommentId, setReplyingCommentId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articleResponse = await getArticle(postId);
                setArticle(articleResponse.data);

                const commentsResponse = await getCommentsByArticle(
                    articleResponse.data.id
                );
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [postId]);

    const onCommentCreated = async (comment) => {
        try {
            const commentResponse = await createComment(comment);
            console.log("commentResponse", commentResponse);
            setComments((prevComments) => [
                ...prevComments,
                commentResponse.data,
            ]);
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    console.log("comments", comments);

    const onDeleteCommentModalOpen = (commentId) => {
        setDeletedCommentId(commentId);
        setIsDeleteCommentModalOpen(() => true);
    };

    const onDeleteCommentModalClose = () => {
        setIsDeleteCommentModalOpen(() => false);
    };

    const onReplyCommentOpen = (commentId) => {
        setIsReplyCommentOpen(true);
        setReplyingCommentId(commentId);
    };

    const onReplyCommentClose = () => {
        setIsReplyCommentOpen(() => false);
    };

    const onDeleteComment = () => {
        deleteComment(deletedCommentId);
        setComments((prev) =>
            prev.filter((item) => item.id !== deletedCommentId)
        );
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
                        <PostCard article={article} />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    {user && (
                        <CommentCreationForm
                            article={article}
                            onCommentCreated={onCommentCreated}
                        />
                    )}
                    <List
                        sx={{
                            width: "100%",
                            mt: 2,
                        }}
                    >
                        {comments.length ? (
                            comments.map((comment) => (
                                <React.Fragment key={comment.id}>
                                    <CommentCard
                                        comment={comment}
                                        onDelete={onDeleteCommentModalOpen}
                                        onReply={() =>
                                            onReplyCommentOpen(comment.id)
                                        }
                                    />
                                    {isReplyCommentOpen &&
                                        replyingCommentId === comment.id && (
                                            <Box sx={{ ml: 9, mb: 2 }}>
                                                <CommentCreationForm
                                                    article={article}
                                                    onClose={
                                                        onReplyCommentClose
                                                    }
                                                    onCommentCreated={(
                                                        comment
                                                    ) =>
                                                        onCommentCreated({
                                                            ...comment,
                                                            comment_id:
                                                                replyingCommentId,
                                                        })
                                                    }
                                                />
                                            </Box>
                                        )}
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            ))
                        ) : (
                            <>No comments</>
                        )}
                    </List>
                    <DeleteModal
                        open={isDeleteCommentModalOpen}
                        onClose={onDeleteCommentModalClose}
                        onDelete={onDeleteComment}
                        title={`Delete comment?`}
                        description={`Do you want to delete this comment?`}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
