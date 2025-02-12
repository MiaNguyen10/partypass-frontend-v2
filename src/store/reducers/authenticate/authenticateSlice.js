import { createSlice } from "@reduxjs/toolkit";
import {loading_status} from "../../../config/Constant"
import { authenticate } from "../../thunk/authenticate";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: loading_status.idle,
  error: null,
};

const authenticateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.removeItem("token");
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authenticateSlice.actions;

export default authenticateSlice.reducer;
