import axios from "axios";

// Create axios instance
const api = axios.create({
    baseURL: "http://localhost:5000",
});

// Add a request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerUser = async (email, password, name) => {
    try {
        const response = await api.post("/auth/register", {
            email,
            password,
            name,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registration failed");
    }
};

export const registerAdmin = async (email, password, name) => {
    try {
        const response = await api.post("/auth/register-admin", {
            email,
            password,
            name
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Admin Registration failed");
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        // Save token and user info to localStorage
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const logoutUser = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
    // For now, we trust localStorage. In a real app, verify token with backend.
    const userStr = localStorage.getItem("user");
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

export const getDestinations = async () => {
    try {
        const response = await api.get("/destinations");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch destinations");
    }
};

export const createBooking = async (bookingData) => {
    try {
        const response = await api.post("/bookings", bookingData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Booking failed");
    }
}

export default api;
