import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Pagination } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PostCard from "./post/PostCard";
import Search from "./search/Search";
import { useEffect, useState } from "react";
import { getArticles } from "./services/ArticleService";

export default function Home() {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles()
            .then((articles) => {
                console.log("articles", articles);
                setArticles(() => articles.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                        variant="h4"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Ignite Your Passion: Explore the Ultimate Sports Blog
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        Dive into a world of sports excitement! Ignite your
                        enthusiasm and stay informed with the ultimate sports
                        lifestyle hub!
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
                    {articles.map((article) => (
                        <Grid item key={article} xs={12} sm={6} md={4}>
                            <PostCard article={article}>
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
