import { createSlice } from '@reduxjs/toolkit';
import { loading_status } from '../../../config/Constant';
import {
  getPurchaseById,
  getPurchaseList,
  getPurchaseListForInstitution,
} from '../../thunk/purchase';

const initialState = {
  purchaseList: [],
  purchaseInfo: {},
  loading: loading_status.idle,
  error: null,
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseList.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getPurchaseList.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.purchaseList = action.payload.map((purchase) => ({
          purchase_id: purchase.purchase_id,
          user_id: purchase.user_id,
          user_name: purchase.user.name,
          ticket_id: purchase.ticket_id,
          ticket_name: purchase.ticket_type.name,
          purchase_date: purchase.purchase_date,
          ticket_date: purchase.ticket_date,
          price_amount: purchase.price_amount,
          payment_status: purchase.payment_status,
          payment_method: purchase.payment_method,
          ticket_status: purchase.ticket_status,
        }));
        state.error = null;
      })
      .addCase(getPurchaseList.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.purchaseList = [];
        state.error = action.error.message;
      })
      .addCase(getPurchaseListForInstitution.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getPurchaseListForInstitution.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.purchaseList = action.payload.map((purchase) => ({
          purchase_id: purchase.purchase_id,
          user_id: purchase.user_id,
          user_name: purchase.user.name,
          ticket_id: purchase.ticket_id,
          ticket_name: purchase.ticket_type.name,
          purchase_date: purchase.purchase_date,
          ticket_date: purchase.ticket_date,
          price_amount: purchase.price_amount,
          payment_status: purchase.payment_status,
          payment_method: purchase.payment_method,
          ticket_status: purchase.ticket_status,
        }));
        state.error = null;
      })
      .addCase(getPurchaseListForInstitution.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.purchaseList = [];
        state.error = action.error.message;
      })
      .addCase(getPurchaseById.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getPurchaseById.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.purchaseInfo = action.payload;
        state.error = null;
      })
      .addCase(getPurchaseById.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default purchaseSlice.reducer;
export const selectPurchaseList = (state) => state.purchase.purchaseList;
export const selectPurchaseListForInstitution = (state) => state.purchase.purchaseList;
export const selectPurchaseInfo = (state) => state.purchase.purchaseInfo;
