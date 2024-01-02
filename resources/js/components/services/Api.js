import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const publicAxiosInstance = axios.create({
    baseURL: API_URL,
});

export const protectedAxiosInstance = axios.create({
    baseURL: API_URL,
});

protectedAxiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "auth_token"
    )}`;
    return config;
});

protectedAxiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log("errore", error);
        if (error.response.status === 401) {
            console.log("Not authorized");
            localStorage.removeItem("token");
        } else {
            throw error;
        }
    }
);
