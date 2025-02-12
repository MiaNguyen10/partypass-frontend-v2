import { createSlice } from "@reduxjs/toolkit";
import {loading_status} from "../../../config/Constant"
import {
  createInstitution,
  deleteInstitution,
  getInstitutionById,
  getInstitutionList,
  getTicketListFromInstitution,
  updateInstitution,
} from "../../thunk/institution";

const initialState = {
  institutions: [],
  tickets: [],
  institution: {
    institution_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    map_location: "",
    status: "",
    details: "",
    cover_photo: "",
    video_link: "",
  },
  loading: loading_status.idle,
  error: null,
};

const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstitutionList.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getInstitutionList.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.institutions = action.payload.map((institution) => ({
          institution_id: institution.institution_id,
          name: institution.name,
          email: institution.email,
          phone: institution.phone,
          address: institution.address,
          map_location: institution.map_location,
          status: institution.status,
          details: institution.details,
          cover_photo: institution.cover_photo,
          video_link: institution.video_link,
        }));
        state.error = null;
      })
      .addCase(getInstitutionList.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.institutions = [];
        state.error = action.error.message;
      })
      .addCase(getInstitutionById.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getInstitutionById.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.institution = {
          ...state.institution,
          ...action.payload,
        };
        state.error = null;
      })
      .addCase(getInstitutionById.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(updateInstitution.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(updateInstitution.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.institutions = state.institutions.map((institution) =>
          institution.id === action.payload.institution_id
            ? action.payload
            : institution
        );
        state.error = null;
      })
      .addCase(updateInstitution.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(createInstitution.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(createInstitution.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.institutions.push(action.payload);
        state.error = null;
      })
      .addCase(createInstitution.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(deleteInstitution.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(deleteInstitution.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.institutions = state.institutions.filter(
          (institution) => institution.id !== action.payload.institution_id
        );
        state.error = null;
      })
      .addCase(deleteInstitution.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(getTicketListFromInstitution.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getTicketListFromInstitution.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.tickets = action.payload;
        state.error = null;
      })
      .addCase(getTicketListFromInstitution.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default institutionSlice.reducer;
export const getInstitutions = (state) => state.institution.institutions;
export const getInstitution = (state) => state.institution.institution;
export const getTicketListFromSpecificInstitution = (state) => state.institution.tickets;
