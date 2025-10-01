import { useState, useEffect, useCallback } from 'react';
import { MOCK_ROUTINES, MESSAGES } from '../../globalSources/constants/mockData';
// import api from '../../services/api'; // Para cuando tengas la API

export const useRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simular carga de rutinas
  const fetchRoutines = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simular datos - Reemplazar con: const response = await api.get('/rutinas');
      setRoutines(MOCK_ROUTINES);
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      console.error('Error fetching routines:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear rutina
  const createRoutine = useCallback(async (routineData) => {
    setLoading(true);
    setError(null);

    try {
      // Simular creación - Reemplazar con: const response = await api.post('/rutinas', routineData);
      const newRoutine = {
        id: Date.now(), // ID temporal
        ...routineData
      };

      setRoutines(prev => [...prev, newRoutine]);
      return { success: true, message: MESSAGES.ROUTINE_CREATED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar rutina
  const updateRoutine = useCallback(async (id, routineData) => {
    setLoading(true);
    setError(null);

    try {
      // Simular actualización - Reemplazar con: await api.put(`/rutinas/${id}`, routineData);
      setRoutines(prev => 
        prev.map(routine => 
          routine.id === id 
            ? { ...routine, ...routineData }
            : routine
        )
      );
      
      return { success: true, message: MESSAGES.ROUTINE_UPDATED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar rutina
  const deleteRoutine = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Simular eliminación - Reemplazar con: await api.delete(`/rutinas/${id}`);
      setRoutines(prev => prev.filter(routine => routine.id !== id));
      
      return { success: true, message: MESSAGES.ROUTINE_DELETED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar rutinas al montar el componente
  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  return {
    routines,
    loading,
    error,
    fetchRoutines,
    createRoutine,
    updateRoutine,
    deleteRoutine
  };
};