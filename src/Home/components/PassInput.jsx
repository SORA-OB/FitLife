import React, { useState } from "react";
// Asegúrate de instalar heroicons: npm install @heroicons/react
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const PasswordInput = ({ value, onChange, name }) => {
  // 1. Estado para controlar si se muestra la contraseña (por defecto, oculto)
  const [showPassword, setShowPassword] = useState(false);

  // Función que simplemente invierte el estado actual
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determina el 'type' del input basado en el estado 'showPassword'
  const inputType = showPassword ? "text" : "password";

  return (
    <div className="relative mb-6">

      {/* Campo de entrada (Input) */}
      <input
        type={inputType}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={name}
        className="placeholder-red-500 peer w-full px-4 py-3 text-gray-900 text-lg border-2 border-red-500 rounded-xl shadow-md bg-gray-200 pr-12 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50"
      />

      {/* Botón para el icono */}
      <div
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500 transition-colors duration-200 hover:text-red-700"
      >
        {/* Cambia el icono basado en el estado 'showPassword' */}
        {showPassword ? (
          <FaRegEyeSlash className="h-6 w-6" />
        ) : (
          <FaRegEye className="h-6 w-6" />
        )}
      </div>
    </div>
  );
};
