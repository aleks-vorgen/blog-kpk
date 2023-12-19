import { useRoutes } from "react-router-dom";
import Home from "../Home";
import PostPage from "../pages/PostPage";
import { ProfilePage } from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import UsersList from "../pages/UsersList";
import TopicsList from "../pages/TopicsList";

export const Router = () => {
    let element = useRoutes([
        {
            path: "/",
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "posts/post/",
                    children: [
                        {
                            index: true,
                            element: <PostPage />,
                        },
                    ],
                },
                {
                    path: "profile/",
                    element: <ProfilePage />,
                },
                {
                    path: "admin/",
                    element: <AdminPage />,
                    children: [
                        {
                            index: true,
                            element: <AdminPage />,
                        },
                        {
                            path: ":tabName",
                            element: <AdminPage />,
                        },
                    ],
                },
            ],
        },
        { path: "*", element: <></> },
    ]);

    return element;
};