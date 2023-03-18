import {
  ModifyReminder,
  Reminder,
  ReminderHistory,
  ReminderWithID,
} from "@/custom_typings/reminderTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";

const initialState: ReminderHistory = {
  reminderHistory: [],
};

export const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action: PayloadAction<Reminder>) => {
      const payload = action.payload;
      const rID: ReminderWithID = { reminder: payload, id: uuidv4() };
      state.reminderHistory.push(rID);
    },
    setReminderStatus: (state, action: PayloadAction<ModifyReminder>) => {
      const reminder = action.payload;
      var objIndex = state.reminderHistory.findIndex(
        (obj) => obj.id == reminder.reminderID
      );
      state.reminderHistory[objIndex].reminder.complete = reminder.complete;
    },
  },
});

export const { addReminder, setReminderStatus } = reminderSlice.actions;
export const selectReminders = (state: RootState) =>
  state.reminders.reminderHistory;
export default reminderSlice.reducer;
