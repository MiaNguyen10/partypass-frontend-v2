import { createSlice } from '@reduxjs/toolkit';
import { loading_status } from '../../../config/Constant';
import {
  createLocker,
  deleteLocker,
  getLockerById,
  getLockerListByInstitution,
  updateLocker,
} from '../../thunk/locker';

const initialState = {
  lockers: [],
  loading: loading_status.idle,
  error: null,
  locker: {},
};

const lockerSlice = createSlice({
  name: 'locker',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLockerListByInstitution.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getLockerListByInstitution.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.lockers = action.payload.map((locker) => ({
          id: locker.id,
          institution_name: locker.institution.name,
          locker_number: locker.locker_number,
          status: locker.status,
        }));
        state.error = null;
      })
      .addCase(getLockerListByInstitution.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.lockers = [];
        state.error = action.error.message;
      })
      .addCase(getLockerById.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getLockerById.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.locker = {
          ...state.locker,
          ...action.payload,
        };
        state.error = null;
      })
      .addCase(getLockerById.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(updateLocker.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(updateLocker.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.lockers = state.lockers.map((locker) =>
          locker.id === action.payload.id ? action.payload : locker,
        );
        state.error = null;
      })
      .addCase(updateLocker.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(createLocker.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(createLocker.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.lockers.push(action.payload);
        state.error = null;
      })
      .addCase(createLocker.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(deleteLocker.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(deleteLocker.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.lockers = state.lockers.filter((locker) => locker.id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteLocker.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default lockerSlice.reducer;
export const getLockersByInstitution = (state) => state.locker.lockers;
export const getLocker = (state) => state.locker.locker;
