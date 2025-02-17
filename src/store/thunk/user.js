import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const getUserList = createAsyncThunk('user/getUserList', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/v1/users/list');
    return response.data.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/users/profile/info/${user_id}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/users/create-user', userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserById = createAsyncThunk(
  'user/updateUserById',
  async ({ user_id, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/v1/users/update-user/${user_id}`, userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const uploadProfilePicture = createAsyncThunk(
  'user/uploadProfilePicture',
  async ({ profile_pic }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/v1/users/profile/upload-profile-picture`,
        profile_pic,
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUserInformation = createAsyncThunk(
  'user/getUserInformation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/users/profile/info');
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/api/v1/users/update-user', userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/users/delete-user/${id}`
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
