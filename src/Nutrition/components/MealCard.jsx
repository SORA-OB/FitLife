import React from 'react';
import { FiClock, FiEdit, FiTrash2, FiInfo } from 'react-icons/fi';
import { MEAL_TYPES } from '../../globalSources/constants/mockData';

export const MealCard = ({ meal, onEdit, onDelete, showDate = false }) => {
  const mealType = MEAL_TYPES.find(type => type.id === meal.tipo);
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta comida?')) {
      onDelete(meal.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{mealType?.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{mealType?.nombre}</h3>
            {showDate && (
              <p className="text-sm text-gray-600">{formatDate(meal.fecha)}</p>
            )}
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onEdit(meal)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Editar comida"
          >
            <FiEdit size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Eliminar comida"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Información nutricional principal */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">{Math.round(meal.totalCalorias)}</div>
          <div className="text-xs text-gray-600">Calorías</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{Math.round(meal.totalProteinas)}g</div>
          <div className="text-xs text-gray-600">Proteínas</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{Math.round(meal.totalCarbohidratos)}g</div>
          <div className="text-xs text-gray-600">Carbohidratos</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-600">{Math.round(meal.totalGrasas)}g</div>
          <div className="text-xs text-gray-600">Grasas</div>
        </div>
      </div>

      {/* Lista de alimentos */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-800 flex items-center">
          <FiInfo size={14} className="mr-1" />
          Alimentos ({meal.alimentos.length})
        </h4>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {meal.alimentos.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
              <span className="font-medium text-gray-800 truncate flex-1">
                {item.alimento.nombre}
              </span>
              <div className="flex items-center space-x-2 text-gray-600 text-xs ml-2">
                <span>{item.cantidad}x</span>
                <span className="text-gray-400">•</span>
                <span>{item.porcion}</span>
                <span className="text-gray-400">•</span>
                <span className="font-medium">
                  {Math.round(item.alimento.calorias * item.alimento.porciones[item.porcion].multiplier * item.cantidad)} cal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notas */}
      {meal.notas && (
        <div className="pt-3 border-t border-gray-100 mt-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Notas:</span> {meal.notas}
          </p>
        </div>
      )}
    </div>
  );
};