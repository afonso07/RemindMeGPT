import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { addReminder } from "@/redux/slices/reminderSlice";

const InputBox = () => {
  const dispatch = useAppDispatch();

  const [textAreaInput, setTextAreaInput] = useState("");
  return (
    <>
      <div className="shadow-xl border-black  w-full rounded-lg border-2 bg-white text-white max-h-56 overflow-auto">
        <TextareaAutosize
          className="w-full h-full bg-transparent text-black p-4 outline-none resize-none -mb-1"
          placeholder="Reminder"
          onChange={(e) => setTextAreaInput(e.target.value)}
          value={textAreaInput}
        />
      </div>
      <button
        className=""
        onClick={() => {
          if (textAreaInput) {
            dispatch(addReminder({ reminder: textAreaInput, complete: false }));
          }
        }}
      >
        <ArrowUpIcon className="h-8 w-8 text-black hover:scale-110" />
      </button>
    </>
  );
};

export default InputBox;
