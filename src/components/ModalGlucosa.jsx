import React from "react";

export default function Modal({ open, children, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 w-full h-screen flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20 overflow-y-auto" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all w-1/2 fixed ml-32 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
