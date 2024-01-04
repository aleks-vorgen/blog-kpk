import { protectedAxiosInstance } from "./Api";

export const getComments = async () => {
    return await protectedAxiosInstance
        .get(`comment`)
        .then((response) => response.data);
};

export const getCommentsByArticle = async (articleId) => {
    return await protectedAxiosInstance
        .get(`comment/article/${articleId}`)
        .then((response) => response.data);
};

export const updateComment = async (commentId, name) => {
    return await protectedAxiosInstance
        .post(`comment/${commentId}`, { _method: "PUT", name })
        .then((response) => response.data);
};

export const getComment = async (commentId) => {
    return await protectedAxiosInstance
        .get(`comment/${commentId}`)
        .then((response) => response.data);
};

export const createComment = async (comment) => {
    console.log('comment', comment);
    return await protectedAxiosInstance
        .post(`comment/`, comment)
        .then((response) => response.data);
};

export const deleteComment = async (commentId) => {
    return await protectedAxiosInstance
        .delete(`comment/${commentId}`)
        .then((response) => response.data);
};
