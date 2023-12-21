import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function UserCard() {
    return (
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
                    sx={{ textAlign: "center" }}
                >
                    Full name
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                    @email
                </Typography>
            </CardContent>
        </Card>
    );
}
