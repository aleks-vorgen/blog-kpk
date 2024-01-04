import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { CardHeader, Chip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getTopic } from "../services/TopicService";
import { useEffect, useState } from "react";

const social = [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
];

export default function PostCard({ article, children }) {
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        getTopic(article?.topic_id)
            .then((topic) => {
                setTopic(() => topic.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardHeader
                action={<Chip label={article?.tag} color="primary" />}
                title={
                    <Typography variant="subtitle1" color="primary">
                        {topic?.name}
                    </Typography>
                }
            />
            <CardMedia
                component="div"
                sx={{
                    pt: "56.25%",
                }}
                image={`http://127.0.0.1:8000/api/${article?.image}`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                ></Box>
                <Typography
                    gutterBottom
                    component="h2"
                    variant="h5"
                    textAlign="center"
                >
                    {article?.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    {article?.description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    justifyContent: "space-between",
                }}
            >
                {children}
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    {social.map((network) => (
                        <Link display="block" href="#" key={network.name}>
                            <network.icon />
                        </Link>
                    ))}
                </Box>
            </CardActions>
        </Card>
    );
}
