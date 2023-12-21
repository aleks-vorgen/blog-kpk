import React, { useEffect } from "react";
import { Container, Tab, Tabs } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import UsersList from "../user/UsersList";
import TopicsList from "../topic/TopicsList";

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
