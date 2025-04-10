// src/components/ui/Label.jsx

import React from "react";

export const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-300 mb-1"
    >
      {children}
    </label>
  );
};
