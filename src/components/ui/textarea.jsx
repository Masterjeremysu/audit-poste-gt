// ✅ src/components/ui/textarea.jsx
import React from "react";

export const Textarea = ({ value, onChange, placeholder, rows = 4, className = "", ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};
