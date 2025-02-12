import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const getTicketList = createAsyncThunk(
  "ticket/getTicketList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/ticket/list");
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTicketById = createAsyncThunk(
  "ticket/getTicketById",
  async (ticket_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/ticket/${ticket_id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTicket = createAsyncThunk(
  "ticket/updateTicket",
  async ({ ticket_id, ticketData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/ticket/update/${ticket_id}`,
        ticketData
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

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/ticket/create",
        ticketData
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

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async (ticket_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/ticket/delete/${ticket_id}`
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
