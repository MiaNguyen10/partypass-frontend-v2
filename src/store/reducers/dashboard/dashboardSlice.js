import { createSlice } from '@reduxjs/toolkit';
import { loading_status } from '../../../config/Constant';
import { getDashboardAnalytics } from '../../thunk/dashboard';

const initialState = {
  analytics: {
    totalUsers: 0,
    totalInstitutions: 0,
    totalTicketsSold: 0,
    totalEvents: 0,
    totalRevenue: '0.00',
    totalCustomers: 0,
  },
  loading: loading_status.idle,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardAnalytics.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.analytics = action.payload;
        state.error = null;
      })
      .addCase(getDashboardAnalytics.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
export const getAnalytics = (state) => state.dashboard.analytics;
