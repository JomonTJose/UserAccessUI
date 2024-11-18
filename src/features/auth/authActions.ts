import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterModel, LoginModel } from "@/models/user";

export const register = createAsyncThunk("auth/register", async (user: RegisterModel, { rejectWithValue }) => {
    try {
        const API_URL = process.env.REACT_APP_BACKEND_URL;
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(`${API_URL}/api/auth/register`, user, config);
        localStorage.setItem('userToken', response.data.accessToken);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof axios.AxiosError) {
            return rejectWithValue(error.response?.data.message);
        }
        return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
});

export const login = createAsyncThunk("auth/login", async (user: LoginModel, { rejectWithValue }) => {
    try {
        const API_URL = process.env.REACT_APP_BACKEND_URL;

        const response = await axios.post(`${API_URL}/api/auth/login`, user);
        localStorage.setItem('userToken', response.data.accessToken);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof axios.AxiosError) {
            return rejectWithValue(error.response?.data.message);
        }
        return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
    }
});

export const clearError = createAsyncThunk("auth/clearError", async () => {
    return "";
}); 