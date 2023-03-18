import React from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { addReminders, selectReminders } from "@/redux/slices/reminderSlice";
import { ReminderWithID } from "@/custom_typings/reminderTypes";
import { GPTChatInput, GPTRoles } from "@/custom_typings/gptTypes";
import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";

const SYSTEM_PROMPT: string = `You are a personal reminder assistant. 
You are fed with several reminders that include information about the reminder.
You must then answer any questionthat your boss asks you about the reminders he 
gives you to analyse in plain English. Make it short, remember he doesn't have
much time! Get back to work!`;

const MODEL = "gpt-4";
const useChatGPT = () => {
  const reminderList = useAppSelector(selectReminders);
  const dispatch = useAppDispatch();

  //? OpenAI
  const configuration = new Configuration({
    organization: process.env.NEXT_PUBLIC_ORG_ID,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const reminderFormatter = (
    reminders: ReminderWithID[]
  ): Array<string> | [] => {
    if (reminders.length == 0) {
      return [];
    }

    //? Filter out for every question
    const formattedReminders: Array<string> = reminders
      .filter((reminder) => !reminder.reminder.gptinterface?.is_question)
      .map(
        (reminder) =>
          `Reminder: ${reminder.reminder.reminder} recorded on: ${reminder.timestamp} and is complete? ${reminder.reminder.complete}`
      );
    console.log({ formattedReminders });
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
      if (!reminderItem.reminder.gptinterface?.is_agent) {
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

  //? We need to add in the user's custom prompt in a formatted manner
  //? Checks the last message in the list and generates a prompt accordingly
  const prompt_formatter = (custom_prompt: string, chatInput: GPTChatInput) => {
    if (chatInput[chatInput.length - 1].role != GPTRoles.USER) {
      chatInput.push({ role: GPTRoles.USER, content: custom_prompt });
    } else {
      chatInput[
        chatInput.length - 1
      ].content = `Given the previous chat history and these additional reminders: ${
        chatInput[chatInput.length - 1].content
      }, ${custom_prompt}`;
    }
  };

  //? User can pass an extra prompt
  const makeChatRequest = async (
    reminderList: ReminderWithID[],
    extra_prompt: string
  ): Promise<ChatCompletionResponseMessage | undefined> => {
    const gptMessages = reminderGPTInput(reminderList);
    //? Format the prompts
    prompt_formatter(extra_prompt, gptMessages);

    const gptChats = gptMessages;
    const completion = await openai.createChatCompletion({
      model: MODEL,
      messages: gptChats,
    });
    return completion.data.choices[0].message;
  };

  // const makeRequest = (formattedReminders:)
  return async (extra_prompt: string) => {
    const chatResult = await makeChatRequest(reminderList, extra_prompt);
    if (chatResult) {
      dispatch(
        addReminders([
          {
            reminder: extra_prompt,
            complete: false,
            gptinterface: { is_question: true },
          },
          {
            reminder: chatResult.content,
            complete: false,
            gptinterface: {
              is_agent: true,
            },
          },
        ])
      );
    }
  };
};

export default useChatGPT;
