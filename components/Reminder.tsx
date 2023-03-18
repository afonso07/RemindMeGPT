import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Reminder = ({ completed = false }: { completed?: boolean }) => {
  return (
    <div className="transition-all bg-gradient-to-r from-indigo-100 to-indigo-300  shadow-xl shadow-indigo-500 ring-offset-2 ring-blue-200 ring-offset-indigo-500 hover:ring-4 w-full p-4 rounded-lg">
      <div className="flex gap-4">
        <span>
          {completed ? (
            <CheckCircleIcon className="w-7 h-7 text-green-500 drop-shadow-md" />
          ) : (
            <XCircleIcon className="w-7 h-7 text-red-500 drop-shadow-md" />
          )}
        </span>
        <span>Reminder</span>
      </div>
    </div>
  );
};

export default Reminder;
