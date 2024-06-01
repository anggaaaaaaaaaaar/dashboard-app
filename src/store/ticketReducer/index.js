import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  detail: {},
};

export const ticketSlice = createSlice({
  name: "ticketSlice",
  initialState,
  reducers: {
    setTicket: (state, action) => {
      state.list = action.payload;
    },
    setTicketDetail: (state, action) => {
      state.detail = action.payload;
    },
    addTicket: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateTicket: (state, action) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTicket, setTicketDetail, addTicket, updateTicket } =
  ticketSlice.actions;

export default ticketSlice.reducer;
