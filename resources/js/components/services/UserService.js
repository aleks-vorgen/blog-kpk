import { publicAxiosInstance, protectedAxiosInstance } from "./Api";
import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
    const token = localStorage.getItem("auth_token");
    return token ? jwtDecode(token).sub : null;
};

export const login = async (email, password) => {
    return await publicAxiosInstance
        .post("user/login", {
            email: email,
            password: password,
        })
        .then((response) => response.data);
};

export const register = async (name, email, password) => {
    return await publicAxiosInstance
        .post("user/register", { name, email, password })
        .then((response) => response.data);
};

export const getUsers = async () => {
    return await protectedAxiosInstance
        .get(`user`)
        .then((response) => response.data);
};

export const getUser = async (userId) => {
    return await protectedAxiosInstance
        .get(`user/${userId}`)
        .then((response) => response.data);
};

export const editUser = async (userId, user) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", user.get("name"));
    formData.append("email", user.get("email"));

    if (user.get("image")) {
        formData.append("image", user.get("image"));
    }

    return await protectedAxiosInstance
        .post(`user/${userId}`, formData)
        .then((response) => response.data);
};

export const deleteUser = async (userId) => {
    return await protectedAxiosInstance
        .delete(`user/${userId}`)
        .then((response) => response.data);
};
