import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from "./slices/reminderSlice";
const store = configureStore({
  reducer: {
    reminders: reminderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
