import React from "react";
import { useAppSelector } from "./reduxHooks";
import { selectReminders } from "@/redux/slices/reminderSlice";
import { ReminderWithID } from "@/custom_typings/reminderTypes";
import { GPTChatInput } from "@/custom_typings/gptTypes";
const { Configuration, OpenAIApi } = require("openai");

const SYSTEM_PROMPT =`You are a personal reminder assistant. 
You are fed with several reminders that include information about the reminder, 
when it was made and whether it is complete or not. You must then answer any question
that your boss asks you about the reminders he gives you to analyse. Get back to work!`

const useChatGPT = async () => {

  const configuration = new Configuration({
    organisation: process.env.NEXT_PUBLIC_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const reminderList = useAppSelector(selectReminders);
  const openai = new OpenAIApi(configuration);

  const reminderFormatter = (reminders: ReminderWithID[]): Array<string> => {

    var tempReminderList = []
    var gptInput: GPTChatInput = []
    var foundAgent = false
    reminders.forEach(reminder => {
      if(!reminder.reminder.is_agent){
        tempReminderList.push(reminder)
      }
      else{

      }
    })
    const formattedReminders: Array<string> = reminders.map(
      (reminder) =>
        `Reminder: ${reminder.reminder.reminder} recorded on: ${reminder.timestamp} and is complete? ${reminder.reminder.complete}`
    );
    return formattedReminders;
  };

  const makeRequest = (formattedReminders:)
  return () => {
    console.log(reminderFormatter(reminderList));
  };
};

export default useChatGPT;
