import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiTarget, FiTrendingUp, FiBook, FiPieChart } from 'react-icons/fi';
import { useNutrition } from '../hooks/useNutrition';
import { MealCard } from '../components/MealCard';
import { MealForm } from '../components/MealForm';
import { CalorieTracker } from '../components/CalorieTracker';
import { MEAL_TYPES } from '../../globalSources/constants/mockData';

export const NutritionPage = () => {
  const {
    foods,
    meals,
    nutritionPlans,
    currentPlan,
    loading,
    error,
    selectedDate,
    getMealsByDate,
    getDayNutritionTotals,
    getNutritionProgress,
    logMeal,
    updateMeal,
    deleteMeal,
    getWeeklyStats,
    activateNutritionPlan,
    setSelectedDate
  } = useNutrition();

  const [isMealFormOpen, setIsMealFormOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [viewMode, setViewMode] = useState('diary'); // 'diary' | 'plans' | 'foods'

  // Obtener datos del día seleccionado
  const todaysMeals = getMealsByDate(selectedDate);
  const dayTotals = getDayNutritionTotals(selectedDate);
  const nutritionProgress = getNutritionProgress(selectedDate);
  const weeklyStats = getWeeklyStats();

  // Handlers
  const handleAddMeal = () => {
    setSelectedMeal(null);
    setIsMealFormOpen(true);
  };

  const handleEditMeal = (meal) => {
    setSelectedMeal(meal);
    setIsMealFormOpen(true);
  };

  const handleDeleteMeal = async (id) => {
    await deleteMeal(id);
  };

  const handleMealFormSubmit = async (formData) => {
    if (selectedMeal) {
      await updateMeal(selectedMeal.id, formData);
    } else {
      await logMeal(formData);
    }
  };

  const formatSelectedDate = () => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMealsByType = () => {
    const mealsByType = {};
    MEAL_TYPES.forEach(type => {
      mealsByType[type.id] = todaysMeals.filter(meal => meal.tipo === type.id);
    });
    return mealsByType;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Nutrición</h1>
          <p className="text-gray-600 mt-1">
            Gestiona tu alimentación y alcanza tus objetivos nutricionales
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Toggle de vista */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('diary')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'diary'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FiBook className="inline mr-2" size={16} />
              Diario
            </button>
            <button
              onClick={() => setViewMode('plans')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'plans'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FiTarget className="inline mr-2" size={16} />
              Planes
            </button>
          </div>
          
          <button
            onClick={handleAddMeal}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg shadow-red-500/25"
          >
            <FiPlus size={20} />
            <span>Registrar Comida</span>
          </button>
        </div>
      </div>

      {/* Estadísticas semanales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
              <FiCalendar className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Días Registrados</h3>
              <p className="text-2xl font-bold text-gray-800">{weeklyStats.daysTracked}/7</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
              <FiPieChart className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Promedio Calorías</h3>
              <p className="text-2xl font-bold text-gray-800">{weeklyStats.averageCalories}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
              <FiTarget className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Promedio Proteínas</h3>
              <p className="text-2xl font-bold text-gray-800">{weeklyStats.averageProtein}g</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
              <FiTrendingUp className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Consistencia</h3>
              <p className="text-2xl font-bold text-gray-800">{weeklyStats.consistency}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Contenido principal */}
      {!loading && !error && (
        <>
          {viewMode === 'diary' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contenido principal - Diario */}
              <div className="lg:col-span-2 space-y-6">
                {/* Selector de fecha */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {formatSelectedDate()}
                    </h3>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-800"
                    />
                  </div>
                  
                  {/* Resumen del día */}
                  <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-red-600">{Math.round(dayTotals.calorias)}</div>
                      <div className="text-sm text-gray-600">Calorías</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600">{Math.round(dayTotals.proteinas)}g</div>
                      <div className="text-sm text-gray-600">Proteínas</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{Math.round(dayTotals.carbohidratos)}g</div>
                      <div className="text-sm text-gray-600">Carbohidratos</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-yellow-600">{Math.round(dayTotals.grasas)}g</div>
                      <div className="text-sm text-gray-600">Grasas</div>
                    </div>
                  </div>
                </div>

                {/* Comidas por tipo */}
                <div className="space-y-4">
                  {MEAL_TYPES.map(mealType => {
                    const meals = getMealsByType()[mealType.id] || [];
                    
                    return (
                      <div key={mealType.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                            <span className="text-2xl mr-3">{mealType.icon}</span>
                            {mealType.nombre}
                          </h4>
                          <span className="text-sm text-gray-600">
                            {meals.length} {meals.length === 1 ? 'comida' : 'comidas'}
                          </span>
                        </div>
                        
                        {meals.length > 0 ? (
                          <div className="space-y-3">
                            {meals.map(meal => (
                              <MealCard
                                key={meal.id}
                                meal={meal}
                                onEdit={handleEditMeal}
                                onDelete={handleDeleteMeal}
                                showDate={false}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-600">
                            <p>No hay comidas registradas para {mealType.nombre.toLowerCase()}</p>
                            <button
                              onClick={handleAddMeal}
                              className="mt-2 text-red-600 hover:text-red-700 font-medium text-sm"
                            >
                              Registrar {mealType.nombre.toLowerCase()}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Panel lateral - Seguimiento */}
              <div className="space-y-6">
                <CalorieTracker 
                  nutritionProgress={nutritionProgress}
                  currentPlan={currentPlan}
                />
              </div>
            </div>
          )}

          {viewMode === 'plans' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Planes disponibles */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Planes Nutricionales</h3>
                {nutritionPlans.map(plan => (
                  <div 
                    key={plan.id}
                    className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 ${
                      currentPlan?.id === plan.id 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => activateNutritionPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-800">{plan.nombre}</h4>
                      {currentPlan?.id === plan.id && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                          Activo
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{plan.descripcion}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Objetivo:</span>
                        <p className="font-medium text-gray-800">{plan.objetivo}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duración:</span>
                        <p className="font-medium text-gray-800">{plan.duracion}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <div className="font-bold text-red-600">{plan.calorias_objetivo}</div>
                        <div className="text-gray-600">Cal</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">{plan.proteinas_objetivo}g</div>
                        <div className="text-gray-600">Prot</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-600">{plan.carbohidratos_objetivo}g</div>
                        <div className="text-gray-600">Carb</div>
                      </div>
                      <div>
                        <div className="font-bold text-yellow-600">{plan.grasas_objetivo}g</div>
                        <div className="text-gray-600">Gras</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Plan activo detallado */}
              {currentPlan && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Plan Activo</h3>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{currentPlan.nombre}</h4>
                    
                    {/* Distribución calórica */}
                    <div className="mb-6">
                      <h5 className="font-medium text-gray-800 mb-3">Distribución Calórica</h5>
                      <div className="space-y-2">
                        {Object.entries(currentPlan.distribucion_calorica).map(([tipo, porcentaje]) => {
                          const mealType = MEAL_TYPES.find(mt => mt.id === tipo);
                          const calorias = Math.round((currentPlan.calorias_objetivo * porcentaje) / 100);
                          
                          return (
                            <div key={tipo} className="flex items-center justify-between text-sm">
                              <span className="flex items-center">
                                <span className="mr-2">{mealType?.icon}</span>
                                {mealType?.nombre}
                              </span>
                              <span className="font-medium">{calorias} cal ({porcentaje}%)</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Alimentos recomendados */}
                    <div className="mb-6">
                      <h5 className="font-medium text-gray-800 mb-3">Alimentos Recomendados</h5>
                      <div className="space-y-1">
                        {currentPlan.alimentos_recomendados.map(foodId => {
                          const food = foods.find(f => f.id === foodId);
                          return food ? (
                            <div key={foodId} className="text-sm text-gray-600 flex items-center justify-between">
                              <span>{food.nombre}</span>
                              <span className="text-xs">({food.categoria})</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    {/* Alimentos a evitar */}
                    <div>
                      <h5 className="font-medium text-gray-800 mb-3">Evitar</h5>
                      <div className="space-y-1">
                        {currentPlan.alimentos_evitar.map((item, index) => (
                          <div key={index} className="text-sm text-red-600">• {item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal de formulario de comida */}
      <MealForm
        isOpen={isMealFormOpen}
        onClose={() => setIsMealFormOpen(false)}
        onSubmit={handleMealFormSubmit}
        meal={selectedMeal}
        foods={foods}
        loading={loading}
      />
    </div>
  );
};