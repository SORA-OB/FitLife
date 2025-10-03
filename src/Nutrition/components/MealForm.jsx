import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiPlus, FiMinus, FiSearch } from 'react-icons/fi';
import { MEAL_TYPES, FOOD_CATEGORIES } from '../../globalSources/constants/mockData';

export const MealForm = ({ isOpen, onClose, onSubmit, meal = null, foods = [], loading = false }) => {
  const [formData, setFormData] = useState({
    fecha: '',
    tipo: '',
    alimentos: [],
    notas: ''
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFoodSelector, setShowFoodSelector] = useState(false);

  // Llenar formulario si estamos editando
  useEffect(() => {
    if (meal) {
      setFormData({
        fecha: meal.fecha || '',
        tipo: meal.tipo || '',
        alimentos: meal.alimentos || [],
        notas: meal.notas || ''
      });
    } else {
      // Establecer fecha por defecto a hoy
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      setFormData({
        fecha: dateStr,
        tipo: '',
        alimentos: [],
        notas: ''
      });
    }
    setErrors({});
    setSearchTerm('');
    setSelectedCategory('');
    setShowFoodSelector(false);
  }, [meal, isOpen]);

  // Manejar cambios en inputs básicos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Filtrar alimentos
  const getFilteredFoods = () => {
    return foods.filter(food => {
      const matchesSearch = food.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || food.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  // Agregar alimento a la comida
  const addFoodToMeal = (food) => {
    const defaultPortion = Object.keys(food.porciones)[0];
    
    setFormData(prev => ({
      ...prev,  
      alimentos: [...prev.alimentos, {
        alimento: food,
        porcion: defaultPortion,
        cantidad: 1
      }]
    }));
    setShowFoodSelector(false);
    setSearchTerm('');
    setSelectedCategory('');
  };

  // Actualizar cantidad o porción de alimento
  const updateFoodItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      alimentos: prev.alimentos.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Remover alimento
  const removeFoodItem = (index) => {
    setFormData(prev => ({
      ...prev,
      alimentos: prev.alimentos.filter((_, i) => i !== index)
    }));
  };

  // Calcular totales nutricionales
  const calculateTotals = () => {
    return formData.alimentos.reduce((acc, item) => {
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
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es requerida';
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Selecciona el tipo de comida';
    }

    if (formData.alimentos.length === 0) {
      newErrors.alimentos = 'Agrega al menos un alimento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    setFormData({ fecha: '', tipo: '', alimentos: [], notas: '' });
    setErrors({});
    setSearchTerm('');
    setSelectedCategory('');
    setShowFoodSelector(false);
    onClose();
  };

  if (!isOpen) return null;

  const totals = calculateTotals();
  const mealTypeObj = MEAL_TYPES.find(type => type.id === formData.tipo);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {meal ? 'Editar Comida' : 'Registrar Comida'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha */}
            <div>
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-800 mb-2">
                Fecha *
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-800 ${
                  errors.fecha
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
                }`}
              />
              {errors.fecha && (
                <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
              )}
            </div>

            {/* Tipo de comida */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-800 mb-2">
                Tipo de Comida *
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-800 ${
                  errors.tipo
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20'
                    : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
                }`}
              >
                <option value="">Selecciona el tipo</option>
                {MEAL_TYPES.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.icon} {type.nombre}
                  </option>
                ))}
              </select>
              {errors.tipo && (
                <p className="mt-1 text-sm text-red-600">{errors.tipo}</p>
              )}
            </div>
          </div>

          {/* Alimentos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-800">
                Alimentos *
                {mealTypeObj && <span className="ml-2">{mealTypeObj.icon}</span>}
              </label>
              <button
                type="button"
                onClick={() => setShowFoodSelector(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
              >
                <FiPlus size={16} />
                <span>Agregar Alimento</span>
              </button>
            </div>

            {/* Lista de alimentos agregados */}
            {formData.alimentos.length > 0 ? (
              <div className="space-y-3 mb-4">
                {formData.alimentos.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{item.alimento.nombre}</h4>
                      <button
                        type="button"
                        onClick={() => removeFoodItem(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Cantidad */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Cantidad</label>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => updateFoodItem(index, 'cantidad', Math.max(0.25, item.cantidad - 0.25))}
                            className="p-1 text-gray-500 hover:text-gray-700 bg-white rounded border"
                          >
                            <FiMinus size={12} />
                          </button>
                          <input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) => updateFoodItem(index, 'cantidad', parseFloat(e.target.value) || 1)}
                            min="0.25"
                            step="0.25"
                            className="w-16 text-center text-sm border border-gray-300 rounded px-2 py-1 text-gray-800"
                          />
                          <button
                            type="button"
                            onClick={() => updateFoodItem(index, 'cantidad', item.cantidad + 0.25)}
                            className="p-1 text-gray-600 hover:text-gray-800 bg-white rounded border border-gray-300 hover:border-gray-400"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Porción */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Porción</label>
                        <select
                          value={item.porcion}
                          onChange={(e) => updateFoodItem(index, 'porcion', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1 text-gray-800"
                        >
                          {Object.entries(item.alimento.porciones).map(([key, portion]) => (
                            <option key={key} value={key}>{portion.nombre}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Info nutricional del item */}
                    <div className="mt-2 text-xs text-gray-600 grid grid-cols-4 gap-2">
                      <span>Cal: {Math.round(item.alimento.calorias * item.alimento.porciones[item.porcion].multiplier * item.cantidad)}</span>
                      <span>P: {Math.round(item.alimento.proteinas * item.alimento.porciones[item.porcion].multiplier * item.cantidad)}g</span>
                      <span>C: {Math.round(item.alimento.carbohidratos * item.alimento.porciones[item.porcion].multiplier * item.cantidad)}g</span>
                      <span>G: {Math.round(item.alimento.grasas * item.alimento.porciones[item.porcion].multiplier * item.cantidad)}g</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                <p>No hay alimentos agregados</p>
                <p className="text-sm text-gray-500">Haz clic en "Agregar Alimento" para comenzar</p>
              </div>
            )}

            {errors.alimentos && (
              <p className="mt-1 text-sm text-red-600">{errors.alimentos}</p>
            )}
          </div>

          {/* Totales nutricionales */}
          {formData.alimentos.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-800 mb-3">Totales Nutricionales</h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-red-600">{Math.round(totals.calorias)}</div>
                  <div className="text-xs text-gray-600">Calorías</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{Math.round(totals.proteinas)}g</div>
                  <div className="text-xs text-gray-600">Proteínas</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{Math.round(totals.carbohidratos)}g</div>
                  <div className="text-xs text-gray-600">Carbohidratos</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">{Math.round(totals.grasas)}g</div>
                  <div className="text-xs text-gray-600">Grasas</div>
                </div>
              </div>
            </div>
          )}

          {/* Notas */}
          <div>
            <label htmlFor="notas" className="block text-sm font-medium text-gray-800 mb-2">
              Notas (opcional)
            </label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors resize-none text-gray-800 placeholder-gray-500"
              placeholder="Agregar notas sobre la comida..."
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FiSave size={16} />
              <span>{loading ? 'Guardando...' : (meal ? 'Actualizar' : 'Registrar')}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Modal de selección de alimentos */}
      {showFoodSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Seleccionar Alimento</h3>
                <button
                  onClick={() => setShowFoodSelector(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Filtros */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar alimentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors text-gray-800 placeholder-gray-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors text-gray-800"
                >
                  <option value="">Todas las categorías</option>
                  {FOOD_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Lista de alimentos */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {getFilteredFoods().map(food => (
                  <div
                    key={food.id}
                    onClick={() => addFoodToMeal(food)}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{food.nombre}</h4>
                        <p className="text-sm text-gray-600">{food.categoria}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p className="font-medium">{food.calorias} cal</p>
                        <p>P:{food.proteinas}g C:{food.carbohidratos}g G:{food.grasas}g</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};