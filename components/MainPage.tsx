import React from "react";
import Reminder from "./Reminder";
import InputBox from "./InputBox";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectReminders } from "@/redux/slices/reminderSlice";

const ReminderHistory = () => {
  const reminderList = useAppSelector(selectReminders);
  console.log("RENDERS");
  return (
    <div className="w-full flex flex-col gap-4 items-center max-h-full p-4 ">
      {reminderList.map((reminder) => (
        <Reminder
          key={reminder.id}
          id={reminder.id}
          gpt_interface={reminder.reminder.gptinterface}
          completed={reminder.reminder.complete}
        >
          {reminder.reminder.reminder}
        </Reminder>
      ))}
    </div>
  );
};

const MainPage = () => {
  return (
    <div className="h-screen p-4 bg-fintime flex flex-col">
      <div className="w-full flex justify-center text-5xl font-bold">
        <span className="text-yellow-900 tracking-widest">RemindMeGPT</span>
      </div>
      <div className="w-full p-4 h-screen overflow-y-hidden">
        <div className="flex flex-col h-full w-full items-center gap-4">
          <div className="relative grow flex h-full w-full lg:w-1/2 overflow-auto">
            <ReminderHistory />
          </div>
          <div className="w-full flex justify-center align-center mb-10 gap-4 lg:w-1/2">
            <InputBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
