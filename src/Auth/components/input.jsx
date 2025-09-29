import { useState } from "react";


export const StaticInput = ({ label, type, value, onChange, name }) => {
  
  return (
    <div className="relative mb-6">

      {/* Etiqueta flotante */}
      <label
        htmlFor={name || label}
        className="absolute left-3 top-[-0.75rem] px-1 text-base font-semibold text-gray-700 bg-white"
        style={{ textShadow: "0 1px 1px rgba(0,0,0,0.1)" }}
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
        className="w-full px-4 py-3 text-gray-900 text-lg border-2 border-gray-200 rounded-xl shadow-sm bg-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
      />

    </div>
  );
};

