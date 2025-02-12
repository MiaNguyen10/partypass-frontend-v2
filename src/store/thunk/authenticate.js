import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const authenticate = createAsyncThunk(
    "auth/authenticate",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/v1/users/login", {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);
