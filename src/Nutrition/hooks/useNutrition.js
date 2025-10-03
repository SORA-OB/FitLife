import { useState, useEffect } from 'react';
import { 
  MOCK_FOODS, 
  MOCK_MEALS, 
  MOCK_NUTRITION_PLANS,
  MEAL_TYPES,
  MESSAGES 
} from '../../globalSources/constants/mockData';

export const useNutrition = () => {
  // Estados principales
  const [foods, setFoods] = useState(MOCK_FOODS);
  const [meals, setMeals] = useState(MOCK_MEALS);
  const [nutritionPlans, setNutritionPlans] = useState(MOCK_NUTRITION_PLANS);
  const [currentPlan, setCurrentPlan] = useState(MOCK_NUTRITION_PLANS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Simular llamadas API con delay
  const simulateApiCall = (ms = 800) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // ========== GESTIÓN DE ALIMENTOS ==========

  // Obtener alimentos filtrados
  const getFilteredFoods = () => {
    return foods.filter(food => {
      const matchesSearch = food.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || food.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  // Crear nuevo alimento
  const createFood = async (foodData) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiCall();
      
      const newFood = {
        id: Math.max(...foods.map(f => f.id)) + 1,
        ...foodData,
        porciones: {
          "100g": { multiplier: 1, nombre: "100 gramos" },
          ...(foodData.porciones || {})
        }
      };
      
      setFoods(prev => [...prev, newFood]);
      return { success: true, message: MESSAGES.FOOD_CREATED };
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar alimento
  const updateFood = async (id, foodData) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiCall();
      
      setFoods(prev => prev.map(food => 
        food.id === id ? { ...food, ...foodData } : food
      ));
      
      return { success: true, message: MESSAGES.FOOD_UPDATED };
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar alimento
  const deleteFood = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiCall();
      setFoods(prev => prev.filter(food => food.id !== id));
      return { success: true, message: MESSAGES.FOOD_DELETED };
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  };

  // ========== GESTIÓN DE COMIDAS ==========

  // Obtener comidas por fecha
  const getMealsByDate = (date) => {
    return meals.filter(meal => meal.fecha === date);
  };

  // Calcular totales nutricionales del día
  const getDayNutritionTotals = (date) => {
    const dayMeals = getMealsByDate(date);
    
    return dayMeals.reduce((totals, meal) => ({
      calorias: totals.calorias + meal.totalCalorias,
      proteinas: totals.proteinas + meal.totalProteinas,
      carbohidratos: totals.carbohidratos + meal.totalCarbohidratos,
      grasas: totals.grasas + meal.totalGrasas
    }), {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    });
  };

  // Calcular progreso hacia objetivos del plan actual
  const getNutritionProgress = (date) => {
    const dayTotals = getDayNutritionTotals(date);
    const plan = currentPlan;
    
    if (!plan) return null;
    
    return {
      calorias: {
        actual: dayTotals.calorias,
        objetivo: plan.calorias_objetivo,
        porcentaje: Math.round((dayTotals.calorias / plan.calorias_objetivo) * 100)
      },
      proteinas: {
        actual: dayTotals.proteinas,
        objetivo: plan.proteinas_objetivo,
        porcentaje: Math.round((dayTotals.proteinas / plan.proteinas_objetivo) * 100)
      },
      carbohidratos: {
        actual: dayTotals.carbohidratos,
        objetivo: plan.carbohidratos_objetivo,
        porcentaje: Math.round((dayTotals.carbohidratos / plan.carbohidratos_objetivo) * 100)
      },
      grasas: {
        actual: dayTotals.grasas,
        objetivo: plan.grasas_objetivo,
        porcentaje: Math.round((dayTotals.grasas / plan.grasas_objetivo) * 100)
      }
    };
  };

  // Registrar comida
  const logMeal = async (mealData) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiCall();
      
      // Calcular totales nutricionales
      const totales = mealData.alimentos.reduce((acc, item) => {
        const food = item.alimento;
        const porcion = food.porciones[item.porcion];
        const multiplier = porcion.multiplier * item.cantidad;
        
        return {
          calorias: acc.calorias + (food.calorias * multiplier),
          proteinas: acc.proteinas + (food.proteinas * multiplier),
          carbohidratos: acc.carbohidratos + (food.carbohidratos * multiplier),
          grasas: acc.grasas + (food.grasas * multiplier)
        };
      }, { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
      
      const newMeal = {
        id: Math.max(...meals.map(m => m.id)) + 1,
        ...mealData,
        totalCalorias: Math.round(totales.calorias * 100) / 100,
        totalProteinas: Math.round(totales.proteinas * 100) / 100,
        totalCarbohidratos: Math.round(totales.carbohidratos * 100) / 100,
        totalGrasas: Math.round(totales.grasas * 100) / 100
      };
      
      setMeals(prev => [...prev, newMeal]);
      return { success: true, message: MESSAGES.MEAL_CREATED };
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar comida
  const updateMeal = async (id, mealData) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiCall();
      
      // Recalcular totales si se modificaron los alimentos
      let updatedMeal = { ...mealData };
      if (mealData.alimentos) {
        const totales = mealData.alimentos.reduce((acc, item) => {
          const food = item.alimento;
          const porcion = food.porciones[item.porcion];
          const multiplier = porcion.multiplier * item.cantidad;
          
          return {
            calorias: acc.calorias + (food.calorias * multiplier),
            proteinas: acc.proteinas + (food.proteinas * multiplier),
            carbohidratos: acc.carbohidratos + (food.carbohidratos * multiplier),
            grasas: acc.grasas + (food.grasas * multiplier)
          };
        }, { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
        
        updatedMeal = {
          ...updatedMeal,
          totalCalorias: Math.round(totales.calorias * 100) / 100,
          totalProteinas: Math.round(totales.proteinas * 100) / 100,
          totalCarbohidratos: Math.round(totales.carbohidratos * 100) / 100,
          totalGrasas: Math.round(totales.grasas * 100) / 100
        };
      }
      
      setMeals(prev => prev.map(meal => 
        meal.id === id ? { ...meal, ...updatedMeal } : meal
      ));
      
      return { success: true, message: MESSAGES.MEAL_UPDATED };
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar comida
  const deleteMeal = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiCall();
      setMeals(prev => prev.filter(meal => meal.id !== id));
      return { success: true, message: MESSAGES.MEAL_DELETED };
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  };

  // ========== GESTIÓN DE PLANES NUTRICIONALES ==========

  // Crear plan nutricional
  const createNutritionPlan = async (planData) => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiCall();
      
      const newPlan = {
        id: Math.max(...nutritionPlans.map(p => p.id)) + 1,
        ...planData
      };
      
      setNutritionPlans(prev => [...prev, newPlan]);
      return { success: true, message: MESSAGES.NUTRITION_PLAN_CREATED };
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  };

  // Activar plan nutricional
  const activateNutritionPlan = (planId) => {
    const plan = nutritionPlans.find(p => p.id === planId);
    if (plan) {
      setCurrentPlan(plan);
    }
  };

  // ========== UTILIDADES ==========

  // Obtener estadísticas semanales
  const getWeeklyStats = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);
    
    const weekMeals = meals.filter(meal => {
      const mealDate = new Date(meal.fecha);
      return mealDate >= weekStart && mealDate <= today;
    });
    
    const totalDays = 7;
    const daysWithMeals = new Set(weekMeals.map(meal => meal.fecha)).size;
    
    const averages = weekMeals.reduce((acc, meal) => ({
      calorias: acc.calorias + meal.totalCalorias,
      proteinas: acc.proteinas + meal.totalProteinas,
      carbohidratos: acc.carbohidratos + meal.totalCarbohidratos,
      grasas: acc.grasas + meal.totalGrasas
    }), { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
    
    return {
      daysTracked: daysWithMeals,
      totalMeals: weekMeals.length,
      averageCalories: daysWithMeals > 0 ? Math.round(averages.calorias / daysWithMeals) : 0,
      averageProtein: daysWithMeals > 0 ? Math.round(averages.proteinas / daysWithMeals) : 0,
      consistency: Math.round((daysWithMeals / totalDays) * 100)
    };
  };

  return {
    // Estados
    foods,
    meals,
    nutritionPlans,
    currentPlan,
    loading,
    error,
    searchTerm,
    selectedCategory,
    selectedDate,
    
    // Funciones de alimentos
    getFilteredFoods,
    createFood,
    updateFood,
    deleteFood,
    
    // Funciones de comidas
    getMealsByDate,
    getDayNutritionTotals,
    getNutritionProgress,
    logMeal,
    updateMeal,
    deleteMeal,
    
    // Funciones de planes
    createNutritionPlan,
    activateNutritionPlan,
    
    // Utilidades
    getWeeklyStats,
    
    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSelectedDate,
    setError
  };
};