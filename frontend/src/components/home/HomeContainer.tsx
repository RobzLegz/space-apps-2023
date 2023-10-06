import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";

const HomeContainer = () => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col my-10 p-4 rounded-lg bg-primary-800 border border-primary-700">
      <h1 className="text-accent text-lg mb-4">NASA Terminal</h1>

      <textarea
        name="terminal"
        id="terminal"
        className="w-full h-full"
        placeholder="Ask me anything..."
      />

      <div className="p-2 w-full mt-4 border-2 border-dashed border-primary-700 rounded-md">
        <input type="file" name="file" id="file" hidden />
        <label
          htmlFor="file"
          className="text-accent cursor-pointer flex items-center justify-start gap-2"
        >
          Upload file <ArrowUpTrayIcon className="text-accent h-5" />
        </label>
      </div>
    </div>
  );
};

export default HomeContainer;
