import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import UserContext from "../context/UserContext";
import { getUser, getUserId } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export const AuthWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    const isUserAuthorized = () => !!user;
    const openAuthModal = () => {
        setShowAuthModal(true);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!localStorage.getItem("auth_token")) {
                setUser(() => null);
                navigate("./");
            } else {
                const userId = getUserId();
                if (userId) {
                    const user = await getUser(userId);
                    setUser(user.data);
                } else {
                    console.error("Unable to get user ID");
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUser, isUserAuthorized, openAuthModal }}
        >
            <AuthModal
                open={showAuthModal}
                onClose={() => {
                    setShowAuthModal(false);
                }}
            />
            {children}
        </UserContext.Provider>
    );
};
