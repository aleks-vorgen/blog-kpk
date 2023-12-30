import axios from "axios";
import config from "../config";

export const publicAxiosInstance = axios.create({
    baseURL: config.API_URL,
});
