import { publicAxiosInstance } from "./Api";

export const login = async (email, password) => {
    return await publicAxiosInstance
        .post(`user/login?email=${email}&password=${password}`)
        .then((response) => response.data);
};
