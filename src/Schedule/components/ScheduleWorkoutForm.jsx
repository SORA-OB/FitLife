import React, { useState, useEffect } from 'react';
import { FiX, FiSave, FiCalendar, FiClock } from 'react-icons/fi';
import { MOCK_ROUTINES } from '../../globalSources/constants/mockData';

export const ScheduleWorkoutForm = ({ isOpen, onClose, onSubmit, workout = null, loading = false }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    routineId: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  // Llenar formulario si estamos editando
  useEffect(() => {
    if (workout) {
      setFormData({
        date: workout.date || '',
        time: workout.time || '',
        routineId: workout.routineId || '',
        notes: workout.notes || ''
      });
    } else {
      // Establecer fecha por defecto a hoy
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      setFormData({
        date: dateStr,
        time: '08:00',
        routineId: '',
        notes: ''
      });
    }
    setErrors({});
  }, [workout, isOpen]);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    } else {
      // Validar que la fecha no sea en el pasado (excepto si estamos editando)
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (!workout && selectedDate < today) {
        newErrors.date = 'No puedes programar entrenamientos en fechas pasadas';
      }
    }

    if (!formData.time) {
      newErrors.time = 'La hora es requerida';
    }

    if (!formData.routineId) {
      newErrors.routineId = 'Selecciona una rutina';
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
      await onSubmit({
        ...formData,
        routineId: parseInt(formData.routineId)
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Cerrar modal
  const handleClose = () => {
    setFormData({ date: '', time: '', routineId: '', notes: '' });
    setErrors({});
    onClose();
  };

  // Obtener horas disponibles
  const getTimeOptions = () => {
    const times = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeStr);
      }
    }
    return times;
  };

  if (!isOpen) return null;

  const selectedRoutine = MOCK_ROUTINES.find(r => r.id === parseInt(formData.routineId));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {workout ? 'Editar Entrenamiento' : 'Programar Entrenamiento'}
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
              <label htmlFor="date" className="block text-sm font-medium text-gray-800 mb-2">
                <FiCalendar className="inline mr-2 text-gray-600" size={16} />
                Fecha *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-800 ${
                  errors.date 
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' 
                    : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            {/* Hora */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-800 mb-2">
                <FiClock className="inline mr-2 text-gray-600" size={16} />
                Hora *
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-800 ${
                  errors.time 
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' 
                    : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
                }`}
              >
                <option value="">Selecciona una hora</option>
                {getTimeOptions().map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Rutina */}
          <div>
            <label htmlFor="routineId" className="block text-sm font-medium text-gray-800 mb-2">
              Rutina *
            </label>
            <select
              id="routineId"
              name="routineId"
              value={formData.routineId}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors text-gray-800 ${
                errors.routineId 
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' 
                  : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
              }`}
            >
              <option value="">Selecciona una rutina</option>
              {MOCK_ROUTINES.map(routine => (
                <option key={routine.id} value={routine.id}>
                  {routine.titulo} ({routine.ejercicios.length} ejercicios)
                </option>
              ))}
            </select>
            {errors.routineId && (
              <p className="mt-1 text-sm text-red-600">{errors.routineId}</p>
            )}
          </div>

          {/* Vista previa de la rutina seleccionada */}
          {selectedRoutine && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Vista previa de la rutina:</h4>
              <div className="space-y-2">
                {selectedRoutine.ejercicios.slice(0, 3).map((ejercicio, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-800">{ejercicio.nombre}</span>
                    <span className="text-gray-600">
                      {ejercicio.series}x{ejercicio.repeticiones} - {ejercicio.peso}kg
                    </span>
                  </div>
                ))}
                {selectedRoutine.ejercicios.length > 3 && (
                  <p className="text-sm text-gray-600">
                    +{selectedRoutine.ejercicios.length - 3} ejercicios más...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Notas */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-800 mb-2">
              Notas (opcional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors resize-none text-gray-800 placeholder-gray-500"
              placeholder="Agregar notas sobre el entrenamiento..."
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
              <span>{loading ? 'Guardando...' : (workout ? 'Actualizar' : 'Programar')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};