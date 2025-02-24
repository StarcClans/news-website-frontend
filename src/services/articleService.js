import axios from 'axios';
import authService from './authService';

const API_BASE_URL = 'http://localhost:8080/api'; // Base URL

const getArticles = async () => {
    try {
        if (!authService.isLoggedIn()) {
            throw new Error("Not logged in. Please login.");
        }

        const token = authService.getToken();
        if (!token) {
            throw new Error("No token found. Please login.");
        }

        const response = await axios.get(`${API_BASE_URL}/articles`, {  // /api/articles for ArticleDto
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};

const articleService = {
    getArticles,
};

export default articleService;
