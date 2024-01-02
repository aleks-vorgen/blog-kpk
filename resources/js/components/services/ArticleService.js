import { protectedAxiosInstance } from "./Api";

export const getArticles = async () => {
    return await protectedAxiosInstance
        .get(`article`)
        .then((response) => response.data);
};

export const updateArticle = async (articleId, article) => {
    return await protectedAxiosInstance
        .put(`article/${articleId}`, article)
        .then((response) => response.data);
};

export const getArticle = async (articleId) => {
    return await protectedAxiosInstance
        .get(`article/${articleId}`)
        .then((response) => response.data);
};

export const createArticle = async (article) => {
    return await protectedAxiosInstance
        .post(`article/`, article)
        .then((response) => response.data);
};

export const deleteArticle = async (articleId) => {
    return await protectedAxiosInstance
        .delete(`article/${articleId}`)
        .then((response) => response.data);
};
