import { configureStore } from "@reduxjs/toolkit";

import ticketReducer from "./ticketReducer";

export const store = configureStore({
  reducer: { ticketReducer },
});
