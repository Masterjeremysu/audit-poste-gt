// src/components/ui/Checkbox.jsx
import React from "react";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-blue-600"
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
