import React, { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { MUSCLE_GROUPS, MESSAGES } from '../../globalSources/constants/mockData';

export const ExerciseForm = ({ isOpen, onClose, onSubmit, exercise = null, loading = false }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    grupoMuscular: '',
    descripcion: ''
  });
  const [errors, setErrors] = useState({});

  // Llenar formulario si estamos editando
  useEffect(() => {
    if (exercise) {
      setFormData({
        nombre: exercise.nombre || '',
        grupoMuscular: exercise.grupoMuscular || '',
        descripcion: exercise.descripcion || ''
      });
    } else {
      setFormData({
        nombre: '',
        grupoMuscular: '',
        descripcion: ''
      });
    }
    setErrors({});
  }, [exercise, isOpen]);

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

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del ejercicio es requerido';
    }

    if (!formData.grupoMuscular) {
      newErrors.grupoMuscular = 'Selecciona un grupo muscular';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
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
    setFormData({ nombre: '', grupoMuscular: '', descripcion: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {exercise ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}
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
          {/* Nombre del ejercicio */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del ejercicio *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full  px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors text-black ${
                errors.nombre 
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' 
                  : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
              }`}
              placeholder="Ej: Curl de bíceps"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
            )}
          </div>

          {/* Grupo muscular */}
          <div>
            <label htmlFor="grupoMuscular" className="block text-sm font-medium text-gray-700 mb-2">
              Grupo muscular *
            </label>
            <select
              id="grupoMuscular"
              name="grupoMuscular"
              value={formData.grupoMuscular}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-black border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                errors.grupoMuscular 
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' 
                  : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
              }`}
            >
              <option value="">Selecciona un grupo muscular</option>
              {MUSCLE_GROUPS.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            {errors.grupoMuscular && (
              <p className="mt-1 text-sm text-red-600">{errors.grupoMuscular}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 text-black py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-colors resize-none ${
                errors.descripcion 
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' 
                  : 'border-gray-200 focus:border-red-400 focus:ring-red-400/20'
              }`}
              placeholder="Describe cómo realizar el ejercicio..."
            />
            {errors.descripcion && (
              <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FiSave size={16} />
              <span>{loading ? 'Guardando...' : 'Guardar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};