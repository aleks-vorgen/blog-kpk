import { Box, Container, Fab, Grid, IconButton, Tooltip } from "@mui/material";
import PostCard from "../post/PostCard";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import CreateEditPostModal from "../post/CreateEditPostModal";
import DeleteModal from "../shared/DeleteModal";
import UserCard from "../user/UserCard";
import UserForm from "../user/UserForm";

const ownPosts = [1, 2, 3, 4, 5];

export default function ProfilePage() {
    const [isCreationPostModalOpen, setIsCreationPostModalOpen] =
        useState(false);
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
    const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);

    const onCreationPostModalOpen = () => {
        setIsCreationPostModalOpen(() => true);
    };

    const onCreationPostModalClose = () => {
        setIsCreationPostModalOpen(() => false);
    };

    const onEditPostModalOpen = () => {
        setIsEditPostModalOpen(() => true);
    };

    const onEditPostModalClose = () => {
        setIsEditPostModalOpen(() => false);
    };

    const onDeletePostModalOpen = () => {
        setIsDeletePostModalOpen(() => true);
    };

    const onDeletePostModalClose = () => {
        setIsDeletePostModalOpen(() => false);
    };

    return (
        <Container sx={{ py: 2, justifyContent: "center", pt: 10 }} spacing={2}>
            <Grid
                container
                spacing={4}
                sx={{ py: 2, justifyContent: "center" }}
            >
                <Grid item xs={4}>
                    <UserCard />
                </Grid>
                <Grid item xs={8}>
                    <UserForm />
                </Grid>
                <Grid item container xs={12} spacing={4} sx={{ mt: 2 }}>
                    {ownPosts.map((post) => (
                        <Grid item xs={4} key={post}>
                            <PostCard>
                                <Box>
                                    <Tooltip title="Delete" placement="top">
                                        <IconButton
                                            onClick={onDeletePostModalOpen}
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton
                                            onClick={onEditPostModalOpen}
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
                    />
                    <CreateEditPostModal
                        open={isEditPostModalOpen}
                        onClose={onEditPostModalClose}
                        // post={post}
                    />
                    <DeleteModal
                        open={isDeletePostModalOpen}
                        onClose={onDeletePostModalClose}
                        // onDelete={onDeleteHandler}
                        title={`Delete post?`}
                        description={`Do you want to delete this post?`}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
