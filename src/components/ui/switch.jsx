// ✅ src/components/ui/switch.jsx
import React from "react";

export const Switch = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div className={`w-10 h-6 rounded-full transition duration-300 ${checked ? "bg-blue-600" : "bg-gray-300"}`}></div>
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
            checked ? "translate-x-4" : ""
          }`}
        ></div>
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};
