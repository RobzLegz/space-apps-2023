import React from "react";

const TerminalContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full max-w-[900px] flex flex-col my-10 p-4 rounded-lg bg-primary-800 border border-primary-700">
      <h1 className="text-accent text-lg mb-3 font-semibold">
        S.T.A.R. Terminal
      </h1>

      {children}
    </div>
  );
};

export default TerminalContainer;
