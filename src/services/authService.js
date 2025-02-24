import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Backend URL

const register = async (name, username, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            name,
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);  // Added error logging
        throw error.response.data;
    }
};

const login = async (usernameOrEmail, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            usernameOrEmail,
            password,
        });

        if (response.data) {
            const token = response.data; // Token is directly in the data
            console.log("Login successful, token received:", token); // Debugging
            localStorage.setItem('token', token); // STORE JUST THE TOKEN
            return true;
        } else {
            console.warn("Login successful, but no token received in response.");
            return false;
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error.response.data;
    }
};

const logout = () => {
    console.log("Logging out, removing token"); // Debugging
    localStorage.removeItem('token');
};

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const isLoggedInValue = !!token && token !== "undefined"; // Check token exists and is not undefined
    console.log("Checking login status, token:", token, "isLoggedIn:", isLoggedInValue);
    return isLoggedInValue;
};

const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("Getting token:", token);  // Debugging
    return token;
};

const authService = {
    register,
    login,
    logout,
    isLoggedIn,
    getToken
};

export default authService;
