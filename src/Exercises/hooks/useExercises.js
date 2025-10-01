import { useState, useEffect, useCallback } from 'react';
import { MOCK_EXERCISES, MESSAGES } from '../../globalSources/constants/mockData';
// import api from '../../services/api'; // Descomentarás esto cuando tengas la API

export const useExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simular carga de ejercicios
  const fetchExercises = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simular datos - Reemplazar con: const response = await api.get('/ejercicios');
      setExercises(MOCK_EXERCISES);
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      console.error('Error fetching exercises:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear ejercicio
  const createExercise = useCallback(async (exerciseData) => {
    setLoading(true);
    setError(null);

    try {
      // Simular creación - Reemplazar con: const response = await api.post('/ejercicios', exerciseData);
      const newExercise = {
        id: Date.now(), // ID temporal
        ...exerciseData
      };

      setExercises(prev => [...prev, newExercise]);
      return { success: true, message: MESSAGES.EXERCISE_CREATED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar ejercicio
  const updateExercise = useCallback(async (id, exerciseData) => {
    setLoading(true);
    setError(null);

    try {
      // Simular actualización - Reemplazar con: await api.put(`/ejercicios/${id}`, exerciseData);
      setExercises(prev => 
        prev.map(exercise => 
          exercise.id === id 
            ? { ...exercise, ...exerciseData }
            : exercise
        )
      );
      
      return { success: true, message: MESSAGES.EXERCISE_UPDATED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar ejercicio
  const deleteExercise = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Simular eliminación - Reemplazar con: await api.delete(`/ejercicios/${id}`);
      setExercises(prev => prev.filter(exercise => exercise.id !== id));
      
      return { success: true, message: MESSAGES.EXERCISE_DELETED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener ejercicios por grupo muscular
  const getExercisesByMuscleGroup = useCallback((muscleGroup) => {
    return exercises.filter(exercise => exercise.grupoMuscular === muscleGroup);
  }, [exercises]);

  // Cargar ejercicios al montar el componente
  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return {
    exercises,
    loading,
    error,
    fetchExercises,
    createExercise,
    updateExercise,
    deleteExercise,
    getExercisesByMuscleGroup
  };
};