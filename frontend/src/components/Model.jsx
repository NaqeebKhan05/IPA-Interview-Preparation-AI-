import React from "react";

const Model = ({ title, children, isOpen, onClose, hideHeader }) => {

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
      {/* Model Content  */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Model Header  */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        <button
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center absolute top-3.5 right-3.5 cursor-pointer"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            stroke="currentColor"
            className="size-6"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        {/* Model Body Scrollable  */}
        <div className="flex overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

export default Model;
