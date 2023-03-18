import React from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { selectReminders } from "@/redux/slices/reminderSlice";
import { ReminderWithID } from "@/custom_typings/reminderTypes";
import { GPTChatInput, GPTRoles } from "@/custom_typings/gptTypes";
import { Configuration, OpenAIApi } from "openai";

const SYSTEM_PROMPT: string = `You are a personal reminder assistant. 
You are fed with several reminders that include information about the reminder, 
when it was made and whether it is complete or not. You must then answer any question
that your boss asks you about the reminders he gives you to analyse. Get back to work!`;

const MODEL = "gpt-4";
const useChatGPT = () => {
  const reminderList = useAppSelector(selectReminders);
  const dispatch = useAppDispatch();

  //? OpenAI
  const configuration = new Configuration({
    organization: process.env.NEXT_PUBLIC_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });
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

  //? Goes through all the reminders, and joins them up until an agent message is found
  const reminderGPTInput = (reminders: ReminderWithID[]): GPTChatInput => {
    var tempReminderList: Array<ReminderWithID> = [];
    //? Initialise with initial prompt
    var gptInput: GPTChatInput = [
      { role: GPTRoles.SYS, content: SYSTEM_PROMPT },
    ];
    var agentResponsePresent = false;
    reminders.forEach((reminderItem) => {
      if (!reminderItem.reminder.is_agent) {
        tempReminderList.push(reminderItem);
      } else {
        //? if an agent is encountered, collate all the previous reminders
        if (tempReminderList.length != 0) {
          gptInput.push(
            {
              role: GPTRoles.USER,
              content: agentResponsePresent
                ? `More reminders: ${reminderFormatter(tempReminderList).join(
                    ", "
                  )}`
                : reminderFormatter(tempReminderList).join(", "),
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
        agentResponsePresent = true;
      }
    });
    //? Check if there are any reminders left back
    if (tempReminderList.length != 0) {
      gptInput.push({
        role: GPTRoles.USER,
        content: agentResponsePresent
          ? `More reminders: ${reminderFormatter(tempReminderList).join(", ")}`
          : reminderFormatter(tempReminderList).join(", "),
      });
    }
    return gptInput;
  };

  const makeChatRequest = (chats: GPTChatInput) => {};

  // const makeRequest = (formattedReminders:)
  return () => {
    console.log(reminderGPTInput(reminderList));
  };
};

export default useChatGPT;
