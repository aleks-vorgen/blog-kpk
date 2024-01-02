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

// export const createUser = async (user) => {
//     return await protectedAxiosInstance
//         .put(`user/${userId}`, user)
//         .then((response) => response.data);
// };

export const editUser = async (userId, user) => {
    return await protectedAxiosInstance
        .post(`user/${userId}`,  {_method: "PUT", user,})
        .then((response) => response.data);
};

export const deleteUser = async (userId) => {
    return await protectedAxiosInstance
        .delete(`user/${userId}`)
        .then((response) => response.data);
};
