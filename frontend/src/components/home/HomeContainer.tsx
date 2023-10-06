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
        <label htmlFor="file" className="text-accent cursor-pointer">
          Upload file
        </label>
      </div>
    </div>
  );
};

export default HomeContainer;
