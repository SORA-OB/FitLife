import React from 'react';
import { FiTarget, FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

export const CalorieTracker = ({ nutritionProgress, currentPlan }) => {
  if (!nutritionProgress || !currentPlan) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Seguimiento Nutricional</h3>
        <p className="text-gray-600">Selecciona un plan nutricional para ver tu progreso.</p>
      </div>
    );
  }

  const getProgressColor = (percentage) => {
    if (percentage < 70) return 'text-red-600';
    if (percentage < 90) return 'text-yellow-600';
    if (percentage <= 110) return 'text-green-600';
    return 'text-orange-600';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage < 70) return 'bg-red-500';
    if (percentage < 90) return 'bg-yellow-500';
    if (percentage <= 110) return 'bg-green-500';
    return 'bg-orange-500';
  };

  const getProgressIcon = (percentage) => {
    if (percentage < 90) return <FiTrendingDown size={16} />;
    if (percentage <= 110) return <FiTarget size={16} />;
    return <FiTrendingUp size={16} />;
  };

  const macros = [
    {
      name: 'Calorías',
      data: nutritionProgress.calorias,
      unit: 'kcal',
      color: 'red'
    },
    {
      name: 'Proteínas',
      data: nutritionProgress.proteinas,
      unit: 'g',
      color: 'blue'
    },
    {
      name: 'Carbohidratos',
      data: nutritionProgress.carbohidratos,
      unit: 'g',
      color: 'green'
    },
    {
      name: 'Grasas',
      data: nutritionProgress.grasas,
      unit: 'g',
      color: 'yellow'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Seguimiento Nutricional</h3>
        <div className="text-sm text-gray-600">
          Plan: <span className="font-medium text-gray-800">{currentPlan.nombre}</span>
        </div>
      </div>

      {/* Macronutrientes */}
      <div className="space-y-4">
        {macros.map((macro) => {
          const percentage = macro.data.porcentaje;
          const remaining = macro.data.objetivo - macro.data.actual;
          
          return (
            <div key={macro.name} className="space-y-2">
              {/* Header del macro */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">{macro.name}</span>
                  <span className={getProgressColor(percentage)}>
                    {getProgressIcon(percentage)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">
                    {Math.round(macro.data.actual)} / {macro.data.objetivo} {macro.unit}
                  </span>
                </div>
              </div>
              
              {/* Barra de progreso */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressBgColor(percentage)}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                  {/* Indicador de exceso */}
                  {percentage > 100 && (
                    <div 
                      className="h-3 bg-red-300 rounded-full absolute top-0"
                      style={{ 
                        left: '100%', 
                        width: `${Math.min(percentage - 100, 50)}%`,
                        transform: 'translateX(-100%)'
                      }}
                    ></div>
                  )}
                </div>
                
                {/* Etiqueta de porcentaje */}
                <div className="absolute right-0 -top-6">
                  <span className={`text-xs font-medium ${getProgressColor(percentage)}`}>
                    {percentage}%
                  </span>
                </div>
              </div>
              
              {/* Información adicional */}
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>
                  {remaining > 0 ? (
                    <>
                      <FiMinus size={12} className="inline mr-1" />
                      Faltan {Math.round(remaining)} {macro.unit}
                    </>
                  ) : remaining < 0 ? (
                    <>
                      <FiTrendingUp size={12} className="inline mr-1" />
                      Exceso de {Math.round(Math.abs(remaining))} {macro.unit}
                    </>
                  ) : (
                    <>
                      <FiTarget size={12} className="inline mr-1" />
                      ¡Objetivo alcanzado!
                    </>
                  )}
                </span>
                <span className="text-gray-500">
                  {macro.name === 'Calorías' ? (
                    percentage < 100 ? 'Por debajo' : percentage > 110 ? 'Por encima' : 'En objetivo'
                  ) : (
                    percentage < 90 ? 'Bajo' : percentage > 110 ? 'Alto' : 'Óptimo'
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen general */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-800">
              {Math.round(nutritionProgress.calorias.actual)}
            </div>
            <div className="text-xs text-gray-600">Calorías consumidas</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">
              {Math.round(nutritionProgress.calorias.objetivo - nutritionProgress.calorias.actual)}
            </div>
            <div className="text-xs text-gray-600">Calorías restantes</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">
              {nutritionProgress.calorias.porcentaje}%
            </div>
            <div className="text-xs text-gray-600">Del objetivo diario</div>
          </div>
        </div>
      </div>
    </div>
  );
};