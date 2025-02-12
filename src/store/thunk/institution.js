import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import axiosFormData from "../api/axiosFormData";

export const getInstitutionList = createAsyncThunk(
  "institution/getInstitutionList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/institute/list");
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInstitutionById = createAsyncThunk(
  "institution/getInstitutionById",
  async (institution_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/institute/${institution_id}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInstitution = createAsyncThunk(
  "institution/updateInstitution",
  async ({institutionData, institution_id}, { rejectWithValue }) => {
    try {
      const response = await axiosFormData.patch(
        `/api/v1/institute/update/${institution_id}`,
        institutionData
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

export const createInstitution = createAsyncThunk(
  "institution/createInstitution",
  async ({institutionData}, { rejectWithValue }) => {
    try {
      const response = await axiosFormData.post(
        "/api/v1/institute/create",
        institutionData
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

export const deleteInstitution = createAsyncThunk(
  "institution/deleteInstitution",
  async (institution_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/institute/delete/${institution_id}`
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

export const getTicketListFromInstitution = createAsyncThunk(
  "institution/getTicketListFromInstitution",
  async (institution_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/institute/${institution_id}/ticketlist`);
      return response.data.data[0].Tickets;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);