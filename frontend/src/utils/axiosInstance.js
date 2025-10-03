import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 90000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        const accesstoken = localStorage.getItem("token");
        if (accesstoken) {
            config.headers.Authorization = `Bearer ${accesstoken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Response Interceptors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to Login Page
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("Internal Server Error");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timed out");
        } 
        return Promise.reject(error);
    }
);

export default axiosInstance;
