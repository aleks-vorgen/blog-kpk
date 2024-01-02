import { protectedAxiosInstance } from "./Api";

export const getArticles = async () => {
    return await protectedAxiosInstance
        .get(`article`)
        .then((response) => response.data);
};

// export const editUser = async (userId, name, email) => {
//     return await protectedAxiosInstance
//         .post(`user/${userId}`,  {_method: "PUT", name, email,})
//         .then((response) => response.data);
// };

export const updateArticle = async (articleId, article) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", article.get("title"));
    formData.append("description", article.get("description"));
    formData.append("tag", article.get("tag"));
    formData.append("topic_id", article.get("topic_id"));
    formData.append("user_id", article.get("user_id"));

    // Append the image if it exists
    if (article.get("image")) {
        formData.append("image", article.get("image"));
    }

    try {
        const response = await protectedAxiosInstance.post(`/article/${articleId}`, formData);
        return response.data;
    } catch (error) {
        // Handle error or throw it for the calling function to handle
        throw error;
    }
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
