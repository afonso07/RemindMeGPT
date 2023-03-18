import React from "react";
import { useAppSelector } from "./reduxHooks";
import { selectReminders } from "@/redux/slices/reminderSlice";

const useChatGPT = () => {
  const reminderList = useAppSelector(selectReminders);

  const reminderFormatter = (reminderList: ReminderWithID[]) => {};

  return () => {};
};
