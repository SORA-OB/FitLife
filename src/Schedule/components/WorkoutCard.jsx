import React from 'react';
import { FiClock, FiPlay, FiCheck, FiX, FiEdit, FiTrash2 } from 'react-icons/fi';
import { WORKOUT_STATUS } from '../../globalSources/constants/mockData';

export const WorkoutCard = ({ workout, onComplete, onCancel, onEdit, onDelete, showDate = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case WORKOUT_STATUS.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-200';
      case WORKOUT_STATUS.CANCELLED:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case WORKOUT_STATUS.COMPLETED:
        return <FiCheck size={14} />;
      case WORKOUT_STATUS.CANCELLED:
        return <FiX size={14} />;
      default:
        return <FiClock size={14} />;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const handleComplete = () => {
    if (workout.status === WORKOUT_STATUS.SCHEDULED) {
      onComplete(workout.id);
    }
  };

  const handleCancel = () => {
    if (workout.status === WORKOUT_STATUS.SCHEDULED) {
      onCancel(workout.id);
    }
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este entrenamiento programado?')) {
      onDelete(workout.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {showDate && (
            <span className="text-sm font-medium text-gray-600">
              {formatDate(workout.date)}
            </span>
          )}
          <span className="text-lg font-medium text-gray-500">
            {workout.time}
          </span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(workout.status)} flex items-center space-x-1`}>
            {getStatusIcon(workout.status)}
            <span className="capitalize">{workout.status}</span>
          </span>
        </div>
        
        {/* Botones de acción secundaria */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(workout)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Editar entrenamiento"
          >
            <FiEdit size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Eliminar entrenamiento"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Información de la rutina */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">{workout.routine.titulo}</h3>
        
        {/* Lista de ejercicios */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">
            Ejercicios ({workout.routine.ejercicios.length})
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {workout.routine.ejercicios.map((ejercicio, index) => (
              <div key={index} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
                <span className="font-medium text-gray-800">{ejercicio.nombre}</span>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>{ejercicio.series}x{ejercicio.repeticiones}</span>
                  {ejercicio.peso > 0 && <span>{ejercicio.peso}kg</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notas */}
        {workout.notes && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Notas:</span> {workout.notes}
            </p>
          </div>
        )}

        {/* Información de completado */}
        {workout.status === WORKOUT_STATUS.COMPLETED && workout.completedAt && (
          <div className="pt-3 border-t border-gray-100 text-sm text-green-600">
            <span className="font-medium">Completado:</span> {new Date(workout.completedAt).toLocaleString('es-ES')}
          </div>
        )}

        {/* Botones de acción principales (solo para entrenamientos programados) */}
        {workout.status === WORKOUT_STATUS.SCHEDULED && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex space-x-3">
              <button
                onClick={handleComplete}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-200 transform active:scale-95 shadow-sm hover:shadow-md"
              >
                <FiCheck size={18} />
                <span>Completar</span>
              </button>
              
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 rounded-xl font-medium transition-all duration-200 transform active:scale-95 shadow-sm hover:shadow-md border border-gray-200 hover:border-red-200"
              >
                <FiX size={18} />
                <span>Cancelar</span>
              </button>
            </div>
          </div>
        )}

        {/* Mensaje para entrenamientos cancelados */}
        {workout.status === WORKOUT_STATUS.CANCELLED && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-700 rounded-xl font-medium border border-red-100">
              <FiX size={18} />
              <span>Entrenamiento Cancelado</span>
            </div>
          </div>
        )}

        {/* Mensaje para entrenamientos completados */}
        {workout.status === WORKOUT_STATUS.COMPLETED && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl font-medium border border-green-100">
              <FiCheck size={18} />
              <span>¡Entrenamiento Completado!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};