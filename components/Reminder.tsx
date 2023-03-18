import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { setReminderStatus } from "@/redux/slices/reminderSlice";
import { GPTInterface } from "@/custom_typings/reminderTypes";

const Reminder = ({
  id,
  completed = false,
  gpt_interface = { is_agent: false, is_question: false },
  children,
}: {
  completed?: boolean;
  children?: React.ReactNode;
  gpt_interface?: GPTInterface;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  return !gpt_interface.is_agent ? (
    gpt_interface.is_question ? (
      <div className="transition-all bg-white shadow-xl border-blue-400 text-blue-400 font-bold border-4 ring-offset-transparent w-full p-4 rounded-lg">
        <div className="flex gap-4">
          <span>
            <QuestionMarkCircleIcon className="w-7 h-7" />
          </span>
          <span className="whitespace-pre-wrap">{children}</span>
        </div>
      </div>
    ) : (
      <div
        className="transition-all bg-white shadow-xl ring-offset-2 ring-blue-200 ring-offset-indigo-500 border-black ring-offset-transparent hover:ring-4 w-full p-4 rounded-lg"
        onClick={() =>
          dispatch(setReminderStatus({ reminderID: id, complete: !completed }))
        }
      >
        <div className="flex gap-4 items-center">
          <span>
            {completed ? (
              <CheckCircleIcon className="w-7 h-7 text-green-500 drop-shadow-md" />
            ) : (
              <XCircleIcon className="w-7 h-7 text-cyan-900 drop-shadow-md" />
            )}
          </span>
          <span>{children}</span>
        </div>
      </div>
    )
  ) : (
    <div className="transition-all bg-white shadow-xl border-orange-400 text-orange-400 font-bold border-4 ring-offset-transparent w-full p-4 rounded-lg">
      <div className="flex gap-4">
        <span>
          <ChatBubbleLeftRightIcon className="w-7 h-7" />
        </span>
        <span className="whitespace-pre-wrap">{children}</span>
      </div>
    </div>
  );
};

export default Reminder;
