import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const getPurchaseList = createAsyncThunk(
  "purchase/getPurchaseList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/purchase/list");
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPurchaseById = createAsyncThunk(
  "purchase/getPurchaseById",
  async (purchase_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/purchase/${purchase_id}`
      );
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


export const getPurchaseListForInstitution = createAsyncThunk(
  "purchase/getPurchaseListForInstitution",
  async(institution_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/purchase/list/institute/${institution_id}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);