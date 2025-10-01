import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import { DAYS_OF_WEEK, MOCK_EXERCISES } from '../../globalSources/constants/mockData';

export const RoutineForm = ({ isOpen, onClose, onSubmit, routine = null, loading = false }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    dias: [],
    ejercicios: []
  });
  const [errors, setErrors] = useState({});
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  // Llenar formulario si estamos editando
  useEffect(() => {
    if (routine) {
      setFormData({
        titulo: routine.titulo || '',
        dias: routine.dias || [],
        ejercicios: routine.ejercicios || []
      });
    } else {
      setFormData({
        titulo: '',
        dias: [],
        ejercicios: []
      });
    }
    setErrors({});
  }, [routine, isOpen]);

  // Manejar cambios en inputs simples
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

  // Manejar selección de días
  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      dias: prev.dias.includes(day)
        ? prev.dias.filter(d => d !== day)
        : [...prev.dias, day]
    }));
  };

  // Agregar ejercicio a la rutina
  const handleAddExercise = (exercise) => {
    const exerciseWithDetails = {
      ...exercise,
      series: 3,
      repeticiones: 12,
      peso: 0
    };

    setFormData(prev => ({
      ...prev,
      ejercicios: [...prev.ejercicios, exerciseWithDetails]
    }));
    setShowExerciseSelector(false);
  };

  // Remover ejercicio de la rutina
  const handleRemoveExercise = (exerciseId) => {
    setFormData(prev => ({
      ...prev,
      ejercicios: prev.ejercicios.filter(ej => ej.id !== exerciseId)
    }));
  };

  // Actualizar detalles de ejercicio (series, reps, peso)
  const handleExerciseDetailChange = (exerciseId, field, value) => {
    setFormData(prev => ({
      ...prev,
      ejercicios: prev.ejercicios.map(ej =>
        ej.id === exerciseId
          ? { ...ej, [field]: parseInt(value) || 0 }
          : ej
      )
    }));
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título de la rutina es requerido';
    }

    if (formData.dias.length === 0) {
      newErrors.dias = 'Selecciona al menos un día de entrenamiento';
    }

    if (formData.ejercicios.length === 0) {
      newErrors.ejercicios = 'Agrega al menos un ejercicio a la rutina';
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

  // Cerrar modal
  const handleClose = () => {
    setFormData({ titulo: '', dias: [], ejercicios: [] });
    setErrors({});
    setShowExerciseSelector(false);
    onClose();
  };

  // Ejercicios disponibles para agregar (no incluidos ya en la rutina)
  const availableExercises = MOCK_EXERCISES.filter(
    exercise => !formData.ejercicios.some(ej => ej.id === exercise.id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {routine ? 'Editar Rutina' : 'Nueva Rutina'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-6">
              {/* Título de la rutina */}
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la rutina *
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors text-black ${
                    errors.titulo 
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' 
                      : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
                  }`}
                  placeholder="Ej: Bíceps y Tríceps"
                />
                {errors.titulo && (
                  <p className="mt-1 text-sm text-red-600">{errors.titulo}</p>
                )}
              </div>

              {/* Días de entrenamiento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Días de entrenamiento *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {DAYS_OF_WEEK.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`p-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        formData.dias.includes(day)
                          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                {errors.dias && (
                  <p className="mt-1 text-sm text-red-600">{errors.dias}</p>
                )}
              </div>
            </div>

            {/* Columna derecha - Ejercicios */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Ejercicios ({formData.ejercicios.length}) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowExerciseSelector(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                  >
                    <FiPlus size={16} />
                    <span>Agregar</span>
                  </button>
                </div>

                {/* Lista de ejercicios seleccionados */}
                <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded-xl p-4">
                  {formData.ejercicios.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No has agregado ejercicios aún
                    </p>
                  ) : (
                    formData.ejercicios.map((ejercicio) => (
                      <div key={ejercicio.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{ejercicio.nombre}</h4>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                              {ejercicio.grupoMuscular}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExercise(ejercicio.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>

                        {/* Controles de series, reps y peso */}
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Series</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={ejercicio.series}
                              onChange={(e) => handleExerciseDetailChange(ejercicio.id, 'series', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-400 text-black"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Reps</label>
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={ejercicio.repeticiones}
                              onChange={(e) => handleExerciseDetailChange(ejercicio.id, 'repeticiones', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-400 text-black"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Peso (kg)</label>
                            <input
                              type="number"
                              min="0"
                              max="500"
                              value={ejercicio.peso}
                              onChange={(e) => handleExerciseDetailChange(ejercicio.id, 'peso', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-400 text-black"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {errors.ejercicios && (
                  <p className="mt-1 text-sm text-red-600">{errors.ejercicios}</p>
                )}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FiSave size={16} />
              <span>{loading ? 'Guardando...' : 'Guardar Rutina'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Modal selector de ejercicios */}
      {showExerciseSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Seleccionar Ejercicio</h3>
              <button
                onClick={() => setShowExerciseSelector(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6">
              {availableExercises.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No hay más ejercicios disponibles
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {availableExercises.map(exercise => (
                    <div
                      key={exercise.id}
                      onClick={() => handleAddExercise(exercise)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{exercise.nombre}</h4>
                          <p className="text-sm text-gray-600 mt-1">{exercise.descripcion}</p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-full">
                          {exercise.grupoMuscular}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};