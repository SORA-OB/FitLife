import React from 'react';
import { FiEdit, FiTrash2, FiInfo } from 'react-icons/fi';

export const ExerciseCard = ({ exercise, onEdit, onDelete, onShowDetail }) => {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ejercicio?')) {
      onDelete(exercise.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Header con grupo muscular */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-full">
          {exercise.grupoMuscular}
        </span>
        
        {/* Botones de acción */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onShowDetail(exercise)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Ver detalles"
          >
            <FiInfo size={16} />
          </button>
          
          <button
            onClick={() => onEdit(exercise)}
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Editar ejercicio"
          >
            <FiEdit size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Eliminar ejercicio"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors cursor-pointer"
            onClick={() => onShowDetail(exercise)}>
          {exercise.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {exercise.descripcion}
        </p>
      </div>

      {/* Footer con ID */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          ID: {exercise.id}
        </span>
      </div>
    </div>
  );
};