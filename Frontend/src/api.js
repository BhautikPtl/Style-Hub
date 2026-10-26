import axios from "axios";

const productionApiUrl = "https://style-hub-e-commerce-backend.onrender.com";
const defaultApiUrl = import.meta.env.DEV
    ? "http://localhost:5000"
    : productionApiUrl;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (typeof config.url === "string" && config.url.startsWith(productionApiUrl)) {
        config.url = config.url.slice(productionApiUrl.length) || "/";
    }

    return config;
});

export default api;
