import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { addReminder } from "@/redux/slices/reminderSlice";
import useChatGPT from "@/hooks/openAIHooks";
import BarLoader from "react-spinners/BarLoader";

const GPT_TRIGGER = "/ask";
const ASK_REGEX = /(?<=^\/ask ).*/gi;

const InputBox = () => {
  const dispatch = useAppDispatch();

  const sendChatToGPT = useChatGPT();

  const [textAreaInput, setTextAreaInput] = useState("");
  const [loading, setLoading] = useState(false);

  //? gets everything after the ask - regex
  const getAskPrompt = (prompt: string): string | null => {
    const matches = prompt.match(ASK_REGEX);
    if (matches?.length) {
      return matches[0];
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="shadow-xl border-black  w-full rounded-lg border-2 bg-white text-white max-h-56 overflow-auto">
        {!loading ? (
          <TextareaAutosize
            className={
              textAreaInput.includes(GPT_TRIGGER)
                ? "w-full h-full bg-transparent text-orange-600 p-4 outline-none resize-none -mb-1 font-bold"
                : "w-full h-full bg-transparent text-black p-4 outline-none resize-none -mb-1"
            }
            placeholder="Reminder"
            onChange={(e) => setTextAreaInput(e.target.value)}
            value={textAreaInput}
          />
        ) : (
          <div className="flex justify-center p-4 h-full w-full">
            <BarLoader color="black" width="50%" />
          </div>
        )}
      </div>
      <button
        className=""
        onClick={async () => {
          if (textAreaInput) {
            if (textAreaInput.includes(GPT_TRIGGER)) {
              const chatPrompt = getAskPrompt(textAreaInput);
              if (chatPrompt) {
                setLoading(true);
                await sendChatToGPT(chatPrompt);
                setLoading(false);
              }
            } else {
              dispatch(
                addReminder({ reminder: textAreaInput, complete: false })
              );
            }
          }
        }}
      >
        <ArrowUpIcon className="h-8 w-8 text-black hover:scale-110" />
      </button>
    </>
  );
};

export default InputBox;
