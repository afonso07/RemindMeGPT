import React from "react";
import { useAppSelector } from "./reduxHooks";
import { selectReminders } from "@/redux/slices/reminderSlice";
import { ReminderWithID } from "@/custom_typings/reminderTypes";
import { GPTChatInput, GPTRoles } from "@/custom_typings/gptTypes";
const { Configuration, OpenAIApi } = require("openai");

const SYSTEM_PROMPT: string = `You are a personal reminder assistant. 
You are fed with several reminders that include information about the reminder, 
when it was made and whether it is complete or not. You must then answer any question
that your boss asks you about the reminders he gives you to analyse. Get back to work!`;

const useChatGPT = async () => {
  const configuration = new Configuration({
    organisation: process.env.NEXT_PUBLIC_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const reminderList = useAppSelector(selectReminders);
  const openai = new OpenAIApi(configuration);

  const reminderFormatter = (
    reminders: ReminderWithID[]
  ): Array<string> | [] => {
    if (reminders.length == 0) {
      return [];
    }
    const formattedReminders: Array<string> = reminders.map(
      (reminder) =>
        `Reminder: ${reminder.reminder.reminder} recorded on: ${reminder.timestamp} and is complete? ${reminder.reminder.complete}`
    );
    return formattedReminders;
  };

  const reminderGPTInput = (reminders: ReminderWithID[]): Array<string> => {
    var tempReminderList: Array<ReminderWithID> = [];
    //? Initialise with initial prompt
    var gptInput: GPTChatInput = [
      { role: GPTRoles.SYS, content: SYSTEM_PROMPT },
    ];
    var foundAgent = false;
    reminders.forEach((reminderItem) => {
      if (!reminderItem.reminder.is_agent) {
        tempReminderList.push(reminderItem);
      } else {
        //? if an agent is encountered, collate all the previous reminders
        if (tempReminderList.length != 0) {
          gptInput.push(
            {
              role: GPTRoles.USER,
              content: reminderFormatter(tempReminderList).join(", "),
            },
            { role: GPTRoles.ASS, content: reminderItem.reminder.reminder }
          );
          tempReminderList = []; //? Reset list
        } else {
          gptInput.push({
            role: GPTRoles.ASS,
            content: reminderItem.reminder.reminder,
          });
        }
      }
    });
    //? Check if there are any reminders left back
  };

  // const makeRequest = (formattedReminders:)
  return () => {
    console.log(reminderFormatter(reminderList));
  };
};

export default useChatGPT;
