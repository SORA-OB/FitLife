import { useState } from "react";


export const StaticInput = ({ label, type, value, onChange, name }) => {
  
  return (
    <div className="relative mb-6">

      {/* Etiqueta flotante */}
      <label
        htmlFor={name || label}
        className="absolute left-3 top-[-0.75rem] px-1 text-base font-semibold text-red-500 bg-gray-200"
        style={{ textShadow: "0 1px 1px rgba(0,0,0,0.2)" }}
      >
        {label}
      </label>

      {/* Campo de entrada (Input) */}
      <input
        type={type}
        id={name || label}
        name={name || label}
        value={value}
        onChange={onChange}
        placeholder=""
        className="w-full px-4 py-3 text-gray-900 text-lg border-2 border-red-500 rounded-xl shadow-md bg-gray-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50"
      />

    </div>
  );
};

