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
    <div className="w-full max-w-[900px] flex flex-col my-10 p-4 rounded-lg bg-primary-800 border border-primary-700">
      <h1 className="text-accent text-lg mb-3 font-semibold">
        S.T.A.R. Terminal
      </h1>

      <input
        type="file"
        name="file"
        id="file"
        hidden
        multiple
        onChange={handleFileSelect}
      />

      <label
        className={`w-full h-[300px] flex items-center justify-center transition-all duration-200 border-2 rounded-lg text-accent flex-col cursor-pointer ${
          dragActive
            ? "border-accent-100 border-solid"
            : "border-accent border-dashed"
        }`}
        onDrag={handleDrag}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onDragLeave={handleDrag}
        htmlFor="file"
      >
        <ArrowUpTrayIcon className="h-10 mb-6" />

        <strong>Drag and drop your documents</strong>

        <small className="text-gray-400 mt-2">Or click to upload</small>
      </label>

      {files.length > 0 && (
        <div className="flex flex-col items-start justify-start mt-4 overflow-x-auto w-full whitespace-nowrap pb-2">
          <p className="text-gray-400">Documents to validate:</p>

          <div className="flex w-full items-center justify-start gap-3 mt-1">
            <div className="flex text-accent gap-3 ">
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
          </div>
        </div>
      )}

      <textarea
        name="terminal"
        id="terminal"
        className="w-full h-full mt-2 bg-primary-900 p-4 min-h-[90px] rounded-lg border border-primary-700"
        placeholder="Add context if needed..."
        rows={2}
      />

      <div className="w-full mt-4 flex">
        <button className="bg-accent rounded-md px-12 py-2 text-primary-900 border-accent-100 hover:bg-accent-100 duration-200 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
};

export default HomeContainer;
