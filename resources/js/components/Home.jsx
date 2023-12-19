import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Pagination } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PostCard from "./post/PostCard";
import Search from "./search/Search";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <main>
            <Box
                sx={{
                    bgcolor: "background.paper",
                    pt: 10,
                    pb: 2,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Album layout
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        Something short and leading about the collection
                        below—its contents, the creator, etc.
                    </Typography>
                </Container>
            </Box>
            <Container
                sx={{ py: 2, justifyContent: "center" }}
                maxWidth="lg"
                spacing={4}
            >
                <Box sx={{ display: "flex", my: 2 }}>
                    <Search />
                </Box>
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <PostCard>
                                <Button
                                    size="small"
                                    component={RouterLink}
                                    to={`/posts/post`}
                                >
                                    Post Comment
                                </Button>
                            </PostCard>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={10}
                    page={page}
                    onChange={handleChange}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 4,
                    }}
                />
            </Container>
        </main>
    );
}
