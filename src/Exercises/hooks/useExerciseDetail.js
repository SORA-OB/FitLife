import { useState, useCallback } from 'react';
import { MOCK_EXERCISES } from '../../globalSources/constants/mockData';
// import api from '../../services/api'; // Para cuando tengas la API

export const useExerciseDetail = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener detalle de un ejercicio específico
  const fetchExerciseDetail = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Simular búsqueda - Reemplazar con: const response = await api.get(`/ejercicios/${id}`);
      const foundExercise = MOCK_EXERCISES.find(ex => ex.id === parseInt(id));
      
      if (foundExercise) {
        setExercise(foundExercise);
      } else {
        setError('Ejercicio no encontrado');
      }

    } catch (err) {
      setError('Error al cargar el ejercicio');
      console.error('Error fetching exercise detail:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpiar el estado del ejercicio
  const clearExercise = useCallback(() => {
    setExercise(null);
    setError(null);
  }, []);

  return {
    exercise,
    loading,
    error,
    fetchExerciseDetail,
    clearExercise
  };
};