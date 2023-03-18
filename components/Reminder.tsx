import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Reminder = ({ completed = false }: { completed?: boolean }) => {
  return (
    <div className="transition-all bg-gradient-to-r from-indigo-100 to-indigo-300  shadow-xl shadow-indigo-500 ring-offset-2 ring-blue-200 ring-offset-indigo-500 hover:ring-4 w-full w-1/2 p-4 rounded-lg">
      <div className="flex gap-4">
        <span>
          <CheckCircleIcon className="w-6 h-6 text-green-500 drop-shadow-lg" />
        </span>
        <span>Reminder</span>
      </div>
    </div>
  );
};

export default Reminder;
