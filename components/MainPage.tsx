import React from "react";
import Reminder from "./Reminder";
import InputBox from "./InputBox";

const MainPage = () => {
  return (
    <div className="h-screen p-4 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col">
      <div className="w-full flex justify-center text-5xl font-bold">
        <span className="text-white">RemindMeGPT</span>
      </div>
      <div className="w-full p-4 mt-4 h-full">
        <div className="flex flex-col h-full items-center">
          <div className="w-full flex flex-col gap-4 items-center flex-grow lg:w-1/2 ">
            <Reminder />
            <Reminder />
          </div>
          <InputBox/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
