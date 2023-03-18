import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const InputBox = () => {
  return (
    <div className="w-full flex justify-center align-center  mb-20 gap-4  lg:w-1/2">
      <div className="shadow-xl shadow-indigo-500bg-white w-full rounded-lg border-2 bg-white/20 text-white max-h-56 overflow-auto">
        <TextareaAutosize className="w-full h-full bg-transparent text-white p-4 outline-none resize-none" />
      </div>
      <button className="">
        <ArrowUpIcon className="h-8 w-8 text-white hover:scale-110" />
      </button>
    </div>
  );
};

export default InputBox;
