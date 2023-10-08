import React from "react";
import TerminalContainer from "../TerminalContainer";
import ProgressBar from "./ProgressBar";

const PBContainer = () => {
  return (
    <TerminalContainer>
      <div className="w-full flex items-center justify-center h-[340px]">
        <ProgressBar />
      </div>
    </TerminalContainer>
  );
};

export default PBContainer;
