import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Fab,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import PostCard from "../post/PostCard";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { CreateEditPost } from "../modals/CreateEditPost";
import { DeleteModal } from "../modals/DeleteModal";

const ownPosts = [1, 2, 3, 4, 5];

export const ProfilePage = () => {
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
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CardMedia
                            component="div"
                            sx={{
                                pt: "56.25%",
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                            alt="user"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{textAlign: 'center'}}
                            >
                                Full name
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                            >
                                @email
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Box
                        component="form"
                        noValidate
                        // onSubmit={handleSubmit}
                        sx={{
                            mt: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="image"
                                    type="file"
                                    id="image"
                                    autoComplete="image"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: 200 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
                <Grid item container xs={12} spacing={4} sx={{ mt: 2 }}>
                    {ownPosts.map((post) => (
                        <Grid item xs={4}>
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
                    <CreateEditPost
                        open={isCreationPostModalOpen}
                        onClose={onCreationPostModalClose}
                    />
                    <CreateEditPost
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
};
