import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { useExercises } from '../hooks/useExercises';
import { ExerciseCard } from '../components/ExerciseCard';
import { ExerciseForm } from '../components/ExerciseForm';
import { MUSCLE_GROUPS } from '../../globalSources/constants/mockData';

export const ExercisesPage = () => {
  const { 
    exercises, 
    loading, 
    error, 
    createExercise, 
    updateExercise, 
    deleteExercise 
  } = useExercises();

  // Estados para modales y filtros
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailExercise, setDetailExercise] = useState(null);

  // Filtrar ejercicios
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === '' || exercise.grupoMuscular === selectedMuscleGroup;
    return matchesSearch && matchesMuscleGroup;
  });

  // Agrupar ejercicios por grupo muscular
  const groupedExercises = filteredExercises.reduce((groups, exercise) => {
    const group = exercise.grupoMuscular;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(exercise);
    return groups;
  }, {});

  // Handlers
  const handleCreateExercise = () => {
    setSelectedExercise(null);
    setIsFormOpen(true);
  };

  const handleEditExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsFormOpen(true);
  };

  const handleDeleteExercise = async (id) => {
    await deleteExercise(id);
  };

  const handleShowDetail = (exercise) => {
    setDetailExercise(exercise);
    setShowDetailModal(true);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedExercise) {
      await updateExercise(selectedExercise.id, formData);
    } else {
      await createExercise(formData);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMuscleGroup('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ejercicios</h1>
          <p className="text-gray-600 mt-1">
            Gestiona tu biblioteca de ejercicios ({exercises.length} ejercicios)
          </p>
        </div>
        
        <button
          onClick={handleCreateExercise}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg shadow-red-500/25"
        >
          <FiPlus size={20} />
          <span>Nuevo Ejercicio</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Barra de búsqueda */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar ejercicios por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors"
            />
          </div>

          {/* Filtro por grupo muscular */}
          <div className="sm:w-64">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedMuscleGroup}
                onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors appearance-none bg-white"
              >
                <option value="">Todos los grupos</option>
                {MUSCLE_GROUPS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón limpiar filtros */}
          {(searchTerm || selectedMuscleGroup) && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Limpiar
            </button>
          )}
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

      {/* Lista de ejercicios agrupados */}
      {!loading && !error && (
        <div className="space-y-8">
          {Object.keys(groupedExercises).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron ejercicios</p>
              {(searchTerm || selectedMuscleGroup) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-red-600 hover:text-red-700 underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          ) : (
            Object.entries(groupedExercises).map(([muscleGroup, groupExercises]) => (
              <div key={muscleGroup}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-full mr-3">
                    {groupExercises.length}
                  </span>
                  {muscleGroup}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupExercises.map(exercise => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onEdit={handleEditExercise}
                      onDelete={handleDeleteExercise}
                      onShowDetail={handleShowDetail}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal de formulario */}
      <ExerciseForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        exercise={selectedExercise}
        loading={loading}
      />

      {/* Modal de detalle */}
      {showDetailModal && detailExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Detalle del Ejercicio</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-full">
                  {detailExercise.grupoMuscular}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">{detailExercise.nombre}</h3>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Descripción:</h4>
                <p className="text-gray-600 leading-relaxed">{detailExercise.descripcion}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-400">ID: {detailExercise.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};