import React, { useEffect } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { Link, useNavigate, Outlet, Route, useParams } from "react-router-dom";
import UsersList from "./UsersList";
import TopicsList from "./TopicsList"; // Assuming TopicsList is exported from TopicsList.js

export default function AdminPage() {
    const navigate = useNavigate();
    const params = useParams();

    const tabs = {
        users: { label: "Users", list: <UsersList /> },
        topics: { label: "Topics", list: <TopicsList /> },
    };

    useEffect(() => {
        if (!params.tabName) {
            navigate("./users", { replace: true });
        }
    }, [params.tabName]);

    // Navigation logic outside useEffect
    const handleChange = (_, newValue) => {
        navigate(`/admin/${newValue}`);
    };

    return (
        <Container sx={{ py: 2, pt: 10, justifyContent: "center" }} spacing={2}>
            <Tabs value={params.tabName || "users"} onChange={handleChange}>
                {Object.keys(tabs).map((tabKey) => (
                    <Tab
                        key={tabKey}
                        label={tabs[tabKey].label}
                        value={tabKey}
                        component={Link}
                        to={`/admin/${tabKey}`}
                    />
                ))}
            </Tabs>
            {tabs[params.tabName]?.list}
        </Container>
    );
}
