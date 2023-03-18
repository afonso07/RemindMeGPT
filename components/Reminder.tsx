import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setReminderStatus } from "@/redux/slices/reminderSlice";

const Reminder = ({
  id,
  completed = false,
  children,
}: {
  completed?: boolean;
  children?: React.ReactNode;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  return (
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
  );
};

export default Reminder;
