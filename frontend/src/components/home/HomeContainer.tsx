import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import TerminalContainer from "../TerminalContainer";
import Response from "./Response";
import PBContainer from "../progressBar/PBContainer";
import { uploadDocument } from "@/requests/uploadDocument";

const HomeContainer = () => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    text?: string;
    fileName?: string;
    issues?: {
      issue: string;
      fix: string;
      source: string;
      priority: string;
      problem: string;
    }[];
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const selectFile = (incFiles: FileList) => {
    let accFiles: File[] = [];

    for (const file of incFiles) {
      if (file.type === "application/pdf") {
        accFiles = [...accFiles, file];
      }
    }
    setFile(accFiles[0]);
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

  const handleSubmit = async () => {
    if (!file) {
      return;
    }

    setLoading(true);

    const data = await uploadDocument({ file });

    setResponse(data);

    setLoading(false);
  };

  if (response) {
    return <Response {...response} />;
  }

  if (loading) {
    return <PBContainer />;
  }

  return (
    <TerminalContainer>
      <input
        type="file"
        name="file"
        id="file"
        hidden
        accept="application/pdf"
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

        <strong>Drag and drop your .pdf document</strong>

        <small className="text-gray-400 mt-2">Or click to upload</small>
      </label>

      {file && (
        <div className="flex flex-col items-start justify-start mt-4 overflow-x-auto w-full whitespace-nowrap">
          <p className="text-gray-400">Documents to validate:</p>

          <div className="flex w-full items-center justify-start gap-3 mt-1">
            <div className="flex text-accent gap-3 ">
              <p
                className="hover:line-through cursor-pointer"
                onClick={() => setFile(null)}
              >
                {file.name}
              </p>
            </div>
          </div>
        </div>
      )}

      <textarea
        name="terminal"
        id="terminal"
        className="w-full h-full mt-4 bg-primary-900 p-4 min-h-[90px] rounded-lg border border-primary-700"
        placeholder="Add context if needed..."
        rows={2}
      />

      <div className="w-full mt-4 flex">
        <button
          className="bg-accent rounded-md px-12 py-2 text-primary-900 border-accent-100 active:hover:bg-accent-100 duration-200 transition-colors disabled:opacity-70"
          onClick={handleSubmit}
          disabled={!file || loading}
        >
          Submit
        </button>
      </div>
    </TerminalContainer>
  );
};

export default HomeContainer;
