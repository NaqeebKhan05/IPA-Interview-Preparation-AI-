import React from "react";
import { LuX } from "react-icons/lu";

/**
 * Drawer
 * - inline: boolean -> when true, render only the panel (no full-screen overlay/backdrop)
 *    -> use this when Drawer is placed inside a fixed container (your desktop case)
 * - when inline is false (default) it behaves like a full-screen overlay (mobile)
 */
const Drawer = ({ isOpen, onClose, title, children, inline = false }) => {
  // Inline variant (panel-only) — good for md+/desktop where you keep the fixed wrapper
  if (inline) {
    return (
      <div
        className={`flex flex-col h-full bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        role="dialog"
        aria-modal={isOpen ? "true" : "false"}
      >
        {/* Header (sticky) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h5 className="text-base font-semibold text-black">{title}</h5>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
            aria-label="Close"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div
          className="p-4 text-sm overflow-y-auto flex-1"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Default overlay variant (full-screen, with backdrop) — keep existing behavior for mobile
  return (
    <div
      className={`transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        ${isOpen ? "translate-x-0" : "translate-x-full"} fixed inset-0 z-50`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop (click to close) */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-[700px] lg:max-w-none bg-white shadow-2xl border-l border-gray-200
            overflow-hidden transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h5 className="text-base font-semibold text-black">{title}</h5>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
            aria-label="Close"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        <div
          className="p-4 text-sm overflow-y-auto h-[calc(100%-4rem)]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
