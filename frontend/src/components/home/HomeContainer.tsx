import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const HomeContainer = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const selectFile = (incFiles: FileList) => {
    let accFiles: File[] = [];

    for (const file of incFiles) {
      accFiles = [...accFiles, file];
    }
    if (setFiles) {
      if (files) {
        setFiles([...files, ...accFiles]);
      } else {
        setFiles([...accFiles]);
      }
    }
  };

  const handleDrag = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      selectFile(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      selectFile(e.target.files);
    }
  };

  return (
    <div
      className="w-full flex flex-col my-10 p-4 rounded-lg bg-primary-800 border border-primary-700"
    //   onDrag={handleDrag}
    //   onDragEnter={handleDrag}
    //   onDragOver={handleDrag}
    //   onDrop={handleDrop}
    //   onDragLeave={handleDrag}
    >
      {dragActive && (
        <div className="w-full h-full absolute top-0 left-0 z-10 bg-black/50 flex items-center justify-center">
          <div className="grid grid-cols-3">
            <div className="p-10 border-t-8 border-l-8 border-accent rounded-lg" />
            <div className="p-10" />
            <div className="p-10 border-t-8 border-r-8 border-accent rounded-lg" />
            <div className="p-10" />
            <div className="flex items-center justify-center text-accent">
              <p>Drop Your files here</p>
            </div>
            <div className="p-10" />
            <div className="p-10 border-b-8 border-l-8 border-accent rounded-lg" />
            <div className="p-10" />
            <div className="p-10 border-b-8 border-r-8 border-accent rounded-lg" />
          </div>
        </div>
      )}

      <h1 className="text-accent text-lg mb-3">NASA Terminal</h1>

      <textarea
        name="terminal"
        id="terminal"
        className="w-full h-full min-h-[370px]"
        placeholder="Ask me anything..."
      />

      <div className="p-2 w-full mt-4 border-2 border-dashed border-primary-700 rounded-md flex flex-col">
        <input
          type="file"
          name="file"
          id="file"
          hidden
          multiple
          onChange={handleFileSelect}
        />
        <label
          htmlFor="file"
          className="text-accent cursor-pointer flex items-center justify-start gap-2"
        >
          Upload file <ArrowUpTrayIcon className="text-accent h-5" />
        </label>

        {files.length > 0 && (
          <div className="flex text-gray-400 gap-3 mt-2">
            {files.map((file, i) => (
              <p
                key={i}
                className="hover:line-through cursor-pointer"
                onClick={() => setFiles(files.filter((f, j) => j !== i))}
              >
                {file.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
