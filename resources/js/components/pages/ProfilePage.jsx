import { Box, Container, Fab, Grid, IconButton, Tooltip } from "@mui/material";
import PostCard from "../post/PostCard";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import CreateEditPostModal from "../post/CreateEditPostModal";
import DeleteModal from "../shared/DeleteModal";
import UserCard from "../user/UserCard";
import UserForm from "../user/UserForm";
import UserContext from "../context/UserContext";
import {
    deleteArticle,
    getArticle,
    getArticles,
} from "../services/ArticleService";

export default function ProfilePage() {
    const { user } = useContext(UserContext);
    const [isCreationPostModalOpen, setIsCreationPostModalOpen] =
        useState(false);
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
    const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
    const [ownArticles, setOwnArticles] = useState([]);
    const [deletedArticleId, setDeletedArticleId] = useState(null);
    const [currentArticle, setCurrentArticle] = useState(null);

    useEffect(() => {
        getArticles()
            .then((articles) => {
                setOwnArticles(() => articles.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onCreationPostModalOpen = () => {
        setIsCreationPostModalOpen(() => true);
    };

    const onCreationPostModalClose = () => {
        setIsCreationPostModalOpen(() => false);
    };

    const onEditPostModalOpen = (articleId) => {
        getArticle(articleId)
            .then((article) => {
                setCurrentArticle(() => article.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsEditPostModalOpen(() => true);
    };

    const onEditPostModalClose = () => {
        setIsEditPostModalOpen(() => false);
    };

    const onDeletePostModalOpen = (articleId) => {
        setDeletedArticleId(articleId);
        setIsDeletePostModalOpen(() => true);
    };

    const onDeletePostModalClose = () => {
        setIsDeletePostModalOpen(() => false);
    };

    const onDeletePost = () => {
        deleteArticle(deletedArticleId);
        setOwnArticles((prev) =>
            prev.filter((item) => item.id !== deletedArticleId)
        );
    };

    return (
        <Container sx={{ py: 2, justifyContent: "center", pt: 10 }} spacing={2}>
            <Grid
                container
                spacing={4}
                sx={{ py: 2, justifyContent: "center" }}
            >
                <Grid item xs={4}>
                    <UserCard user={user} />
                </Grid>
                <Grid item xs={8}>
                    <UserForm user={user} />
                </Grid>
                <Grid item container xs={12} spacing={4} sx={{ mt: 2 }}>
                    {ownArticles.map((article, index) => (
                        <Grid item xs={4} key={index}>
                            <PostCard article={article}>
                                <Box>
                                    <Tooltip title="Delete" placement="top">
                                        <IconButton
                                            onClick={() =>
                                                onDeletePostModalOpen(
                                                    article.id
                                                )
                                            }
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton
                                            onClick={() =>
                                                onEditPostModalOpen(article.id)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </PostCard>
                        </Grid>
                    ))}
                    <Tooltip title="Add new post" placement="top">
                        <Fab
                            color="secondary"
                            sx={{
                                position: "fixed",
                                bottom: 30,
                                right: 30,
                            }}
                            onClick={onCreationPostModalOpen}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <CreateEditPostModal
                        open={isCreationPostModalOpen}
                        onClose={onCreationPostModalClose}
                        setOwnArticles={setOwnArticles}
                    />
                    <CreateEditPostModal
                        open={isEditPostModalOpen}
                        onClose={onEditPostModalClose}
                        setOwnArticles={setOwnArticles}
                        article={currentArticle}
                    />
                    <DeleteModal
                        open={isDeletePostModalOpen}
                        onClose={onDeletePostModalClose}
                        onDelete={onDeletePost}
                        title={`Delete post?`}
                        description={`Do you want to delete this post?`}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
