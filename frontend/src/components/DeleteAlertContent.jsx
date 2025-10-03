import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px]">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-red-800 hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-10"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
