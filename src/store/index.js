import { configureStore } from "@reduxjs/toolkit";

import ticketReducer from "./ticketReducer";
import settingReducer from "./settings";

export const store = configureStore({
  reducer: { ticketReducer, setting: settingReducer },
});
