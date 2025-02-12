import { createSlice } from "@reduxjs/toolkit";
import { loading_status } from "../../../config/Constant";
import { createUser, getUserById, getUserInformation, getUserList, updateUser } from "../../thunk/user";

const initialState = {
  users: [],
  loading: loading_status.idle,
  error: null,
  user: {
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    is_social: false,
    institution_id: "",
    date_of_birth: "",
    social_uuid: "",
    profile_pic: "",
  },
  userLogin: {
    user_id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    is_social: false,
    institution_id: "",
    date_of_birth: "",
    social_uuid: "",
    profile_pic: "",
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.users = action.payload
        state.error = null;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.tickets = [];
        state.error = action.error.message;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.user = action.payload
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.tickets.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(getUserInformation.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getUserInformation.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.userLogin = action.payload;
        state.error = null;
      })
      .addCase(getUserInformation.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user === action.payload.id ? action.payload : user
        );
        state.loading = loading_status.succeeded;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const getUsers = (state) => state.user.users;
export const getUser = (state) => state.user.user;
export const getUserLogin = (state) => state.user.userLogin;