import React from "react";
import Reminder from "./Reminder";

const MainPage = () => {
  return (
    <div className="h-screen p-4">
      <div className="w-full flex justify-center text-5xl font-bold">
        <span className="text-blue-500">RemindMeGPT</span>
      </div>
      <div className="w-full p-4">
        <div className="flex flex-col items-center gap-4">
          <Reminder />
          <Reminder />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
