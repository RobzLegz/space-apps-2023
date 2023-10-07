import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  // PROGRESS BAR //
  const [progress, setProgress] = useState(0);

  const progressBarStyle = {
    width: `${progress}%`,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newProgress = progress + Math.floor(Math.random() * 5);
      if (newProgress < 100) {
        setProgress(newProgress);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [progress]);

  // END PROGRESS BAR //

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="relative pt-1">
        <div className="flex items-center justify-between text-white">
          <div className="text-xs font-semibold inline-block py-1 text-accent px-2 uppercase rounded-full">
            PROCESSING...
          </div>
          <span className="text-xs font-semibold inline-block text-accent">
            {progress}%
          </span>
        </div>
        <div className="flex mt-2">
          <div className="bg-primary-900 rounded-full flex-grow h-2">
            <div
              className="rounded-full h-1 bg-accent"
              style={progressBarStyle}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
