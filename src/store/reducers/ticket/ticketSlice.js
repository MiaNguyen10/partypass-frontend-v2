import { createSlice } from "@reduxjs/toolkit";
import { loading_status } from "../../../config/Constant";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTicketList,
  updateTicket,
} from "../../thunk/ticket";

const initialState = {
  tickets: [],
  loading: loading_status.idle,
  error: null,
  ticket: {
    id: "",
    name: "",
    description: "",
    institution_id: "",
    price: "",
    capacity: "",
    benefits: "",
    is_regular: "",
    date: "",
    start_datetime: "",
    end_datetime: "",
    institution_name: "",
  },
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketList.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getTicketList.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.tickets = action.payload.map((ticket) => ({
          id: ticket.ticket_id,
          name: ticket.name,
          description: ticket.description,
          institution_id: ticket.institution_id,
          price: ticket.price,
          capacity: ticket.capacity,
          benefits: ticket.benefits,
          is_regular: ticket.is_regular,
          date: ticket.date,
          start_datetime: ticket.start_datetime,
          end_datetime: ticket.end_datetime,
          institution_name: ticket.institution.name,
        }));
        state.error = null;
      })
      .addCase(getTicketList.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.tickets = [];
        state.error = action.error.message;
      })
      .addCase(getTicketById.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.ticket = {
          ...state.ticket,
          ...action.payload,
          institution_name: action.payload.institution.name,
        };
        state.error = null;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(updateTicket.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.tickets = state.tickets.map((ticket) =>
          ticket.id === action.payload.ticket_id ? action.payload : ticket
        );
        state.error = null;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.tickets.push(action.payload);
        state.error = null;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.tickets = state.tickets.filter(
          (ticket) => ticket.id !== action.payload.ticket_id
        );
        state.error = null;
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default ticketSlice.reducer;
export const getTickets = (state) => state.ticket.tickets;
export const getTicket = (state) => state.ticket.ticket;
