import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const getLockerListByInstitution = createAsyncThunk(
  "locker/getLockerListByInstitution",
  async ({institution_id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/locker/list/${institution_id}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLockerById = createAsyncThunk(
  "locker/getLockerById",
  async ({locker_id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/locker/${locker_id}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLocker = createAsyncThunk(
  "locker/updateLocker",
  async ({ locker_id, lockerData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/locker/update/${locker_id}`,
        lockerData
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createLocker = createAsyncThunk(
  "locker/createLocker",
  async ({lockerData}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/locker/create",
        lockerData
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLocker = createAsyncThunk(
  "locker/deleteLocker",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/locker/delete/${id}`
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
