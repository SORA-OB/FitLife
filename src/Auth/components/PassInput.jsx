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

  // Función para filtrar caracteres especiales
  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    // Solo permite letras (a-z, A-Z), números (0-9) y algunos caracteres seguros como guión bajo
    const filteredValue = inputValue.replace(/[^a-zA-Z0-9_]/g, '');
    
    // Crear evento sintético con el valor filtrado
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: filteredValue
      }
    };
    
    onChange(syntheticEvent);
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
        onChange={handlePasswordChange}
        placeholder={name}
        maxLength={50}
        className="placeholder-gray-500 peer w-full px-4 py-3 text-gray-900 text-lg border-2 border-gray-200 rounded-xl shadow-sm bg-white pr-12 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
      />

      {/* Botón para el icono */}
      <div
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 transition-colors duration-200 hover:text-gray-700 cursor-pointer"
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
