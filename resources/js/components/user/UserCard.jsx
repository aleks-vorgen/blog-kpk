import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function UserCard({ user }) {
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
                image={`http://127.0.0.1:8000/api/${user?.image}` }
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                >
                    {user?.name}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {user?.email}
                </Typography>
            </CardContent>
        </Card>
    );
}
