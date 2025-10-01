import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiCalendar, FiInfo } from 'react-icons/fi';

export const RoutineCard = ({ routine, onEdit, onDelete }) => {
  const [hoveredExercise, setHoveredExercise] = useState(null);

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta rutina?')) {
      onDelete(routine.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{routine.titulo}</h3>
        
        {/* Botones de acción */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(routine)}
            className="p-2 text-black hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Editar rutina"
          >
            <FiEdit size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Eliminar rutina"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Días de entrenamiento */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <FiCalendar className="text-gray-400 mr-2" size={16} />
          <span className="text-sm font-medium text-gray-700">Días de entrenamiento</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {routine.dias.map((dia, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full"
            >
              {dia}
            </span>
          ))}
        </div>
      </div>

      {/* Lista de ejercicios */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Ejercicios</h4>
          <span className="text-sm text-gray-500">
            {routine.ejercicios.length} ejercicio{routine.ejercicios.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {routine.ejercicios.map((ejercicio) => (
            <div
              key={ejercicio.id}
              className="relative p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              onMouseEnter={() => setHoveredExercise(ejercicio)}
              onMouseLeave={() => setHoveredExercise(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{ejercicio.nombre}</span>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {ejercicio.grupoMuscular}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{ejercicio.series} series</span>
                  <span>{ejercicio.repeticiones} reps</span>
                  <span className="font-medium">{ejercicio.peso} kg</span>
                </div>
              </div>

              {/* Tooltip con descripción */}
              {hoveredExercise?.id === ejercicio.id && (
                <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                  <div className="flex items-start space-x-2">
                    <FiInfo className="flex-shrink-0 mt-0.5" size={14} />
                    <p>{ejercicio.descripcion}</p>
                  </div>
                  {/* Flecha del tooltip */}
                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer con estadísticas */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          
          <span>
            Total: {routine.ejercicios.reduce((total, ej) => total + (ej.series * ej.repeticiones), 0)} repeticiones
          </span>
        </div>
      </div>
    </div>
  );
};