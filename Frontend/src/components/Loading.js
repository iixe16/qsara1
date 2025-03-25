import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center mt-2">
        
          <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
        </div>
      )}
    </div>
  );
};

export default Loading;
