import React, { useState } from 'react';
import { FiPlus, FiSearch, FiCalendar } from 'react-icons/fi';
import { useRoutines } from '../hooks/useRoutines';
import { RoutineCard } from '../components/RoutineCard';
import { RoutineForm } from '../components/RoutineForm';

export const RoutinesPage = () => {
  const { 
    routines, 
    loading, 
    error, 
    createRoutine, 
    updateRoutine, 
    deleteRoutine 
  } = useRoutines();

  // Estados para modales y filtros
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar rutinas
  const filteredRoutines = routines.filter(routine => {
    const matchesSearch = routine.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         routine.ejercicios.some(ej => 
                           ej.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ej.grupoMuscular.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesSearch;
  });

  // Handlers
  const handleCreateRoutine = () => {
    setSelectedRoutine(null);
    setIsFormOpen(true);
  };

  const handleEditRoutine = (routine) => {
    setSelectedRoutine(routine);
    setIsFormOpen(true);
  };

  const handleDeleteRoutine = async (id) => {
    await deleteRoutine(id);
  };

  const handleFormSubmit = async (formData) => {
    if (selectedRoutine) {
      await updateRoutine(selectedRoutine.id, formData);
    } else {
      await createRoutine(formData);
    }
  };

  // Estadísticas rápidas
  const totalExercises = routines.reduce((total, routine) => total + routine.ejercicios.length, 0);
  const totalRepetitions = routines.reduce((total, routine) => 
    total + routine.ejercicios.reduce((rtotal, ej) => rtotal + (ej.series * ej.repeticiones), 0), 0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rutinas de Entrenamiento</h1>
          <p className="text-gray-600 mt-1">
            Organiza y planifica tus entrenamientos ({routines.length} rutinas)
          </p>
        </div>
        
        <button
          onClick={handleCreateRoutine}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg shadow-red-500/25"
        >
          <FiPlus size={20} />
          <span>Nueva Rutina</span>
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl">
              <FiCalendar className="text-red-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Rutinas</h3>
              <p className="text-2xl font-bold text-gray-900">{routines.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
              <FiPlus className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Ejercicios</h3>
              <p className="text-2xl font-bold text-gray-900">{totalExercises}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
              <FiCalendar className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Repeticiones</h3>
              <p className="text-2xl font-bold text-gray-900">{totalRepetitions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar rutinas por título o ejercicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
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

      {/* Lista de rutinas */}
      {!loading && !error && (
        <div className="space-y-6">
          {filteredRoutines.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  {searchTerm ? 'No se encontraron rutinas' : 'No tienes rutinas creadas'}
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  {searchTerm 
                    ? 'Intenta con otros términos de búsqueda' 
                    : 'Crea tu primera rutina para comenzar a entrenar de forma organizada'
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCreateRoutine}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200"
                  >
                    <FiPlus size={20} />
                    <span>Crear Primera Rutina</span>
                  </button>
                )}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-red-600 hover:text-red-700 underline"
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRoutines.map(routine => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  onEdit={handleEditRoutine}
                  onDelete={handleDeleteRoutine}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal de formulario */}
      <RoutineForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        routine={selectedRoutine}
        loading={loading}
      />
    </div>
  );
};