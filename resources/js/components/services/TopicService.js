import { protectedAxiosInstance } from "./Api";

export const getTopics = async () => {
    return await protectedAxiosInstance
        .get(`topic`)
        .then((response) => response.data);
};

// export const editUser = async (userId, name, email) => {
//     return await protectedAxiosInstance
//         .post(`user/${userId}`,  {_method: "PUT", name, email,})
//         .then((response) => response.data);

export const updateTopic = async (topicId, name) => {
    return await protectedAxiosInstance
        .post(`topic/${topicId}`, {_method: "PUT", name })
        .then((response) => response.data);
};

export const getTopic = async (topicId) => {
    return await protectedAxiosInstance
        .get(`topic/${topicId}`)
        .then((response) => response.data);
};

export const createTopic = async (title) => {
    return await protectedAxiosInstance
        .post(`topic/`, { name: title })
        .then((response) => response.data);
};

export const deleteTopic = async (topicId) => {
    return await protectedAxiosInstance
        .delete(`topic/${topicId}`)
        .then((response) => response.data);
};
