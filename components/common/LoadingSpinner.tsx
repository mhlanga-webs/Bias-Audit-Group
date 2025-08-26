import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 h-full">
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-brand-primary"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
       <p className="text-gray-400">Generating insights with AI...</p>
    </div>
  );
};

export default LoadingSpinner;
