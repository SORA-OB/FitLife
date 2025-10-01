import { useState, useCallback } from 'react';
import { MOCK_ROUTINES } from '../../globalSources/constants/mockData';
// import api from '../../services/api'; // Para cuando tengas la API

export const useRoutineDetail = () => {
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener detalle de una rutina específica
  const fetchRoutineDetail = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Simular búsqueda - Reemplazar con: const response = await api.get(`/rutinas/${id}`);
      const foundRoutine = MOCK_ROUTINES.find(r => r.id === parseInt(id));
      
      if (foundRoutine) {
        setRoutine(foundRoutine);
      } else {
        setError('Rutina no encontrada');
      }

    } catch (err) {
      setError('Error al cargar la rutina');
      console.error('Error fetching routine detail:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpiar el estado de la rutina
  const clearRoutine = useCallback(() => {
    setRoutine(null);
    setError(null);
  }, []);

  return {
    routine,
    loading,
    error,
    fetchRoutineDetail,
    clearRoutine
  };
};