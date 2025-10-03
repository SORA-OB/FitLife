import { useState, useEffect, useCallback } from 'react';
import { MOCK_SCHEDULED_WORKOUTS, MOCK_ROUTINES, MESSAGES, WORKOUT_STATUS } from '../../globalSources/constants/mockData';
// import api from '../../services/api'; // Para cuando tengas la API

export const useSchedule = () => {
  const [scheduledWorkouts, setScheduledWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simular carga de entrenamientos programados
  const fetchScheduledWorkouts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simular datos - Reemplazar con: const response = await api.get('/schedule');
      setScheduledWorkouts(MOCK_SCHEDULED_WORKOUTS);
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      console.error('Error fetching scheduled workouts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Programar nuevo entrenamiento
  const scheduleWorkout = useCallback(async (workoutData) => {
    setLoading(true);
    setError(null);

    try {
      // Buscar la rutina completa
      const routine = MOCK_ROUTINES.find(r => r.id === workoutData.routineId);
      
      if (!routine) {
        throw new Error('Rutina no encontrada');
      }

      // Simular creación - Reemplazar con: const response = await api.post('/schedule', workoutData);
      const newWorkout = {
        id: Date.now(),
        ...workoutData,
        routine: routine,
        status: WORKOUT_STATUS.SCHEDULED
      };

      setScheduledWorkouts(prev => [...prev, newWorkout]);
      return { success: true, message: MESSAGES.WORKOUT_SCHEDULED };
      
    } catch (err) {
      setError(err.message || MESSAGES.ERROR_GENERIC);
      return { success: false, message: err.message || MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar entrenamiento
  const updateScheduledWorkout = useCallback(async (id, workoutData) => {
    setLoading(true);
    setError(null);

    try {
      // Simular actualización - Reemplazar con: await api.put(`/schedule/${id}`, workoutData);
      setScheduledWorkouts(prev => 
        prev.map(workout => 
          workout.id === id 
            ? { ...workout, ...workoutData }
            : workout
        )
      );
      
      return { success: true, message: MESSAGES.WORKOUT_UPDATED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Marcar entrenamiento como completado
  const completeWorkout = useCallback(async (id, completionData = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Simular completar entrenamiento - Reemplazar con: await api.patch(`/schedule/${id}/complete`, completionData);
      setScheduledWorkouts(prev => 
        prev.map(workout => 
          workout.id === id 
            ? { 
                ...workout, 
                status: WORKOUT_STATUS.COMPLETED,
                completedAt: new Date().toISOString(),
                ...completionData
              }
            : workout
        )
      );
      
      return { success: true, message: MESSAGES.WORKOUT_COMPLETED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancelar entrenamiento
  const cancelWorkout = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Simular cancelación - Reemplazar con: await api.patch(`/schedule/${id}/cancel`);
      setScheduledWorkouts(prev => 
        prev.map(workout => 
          workout.id === id 
            ? { ...workout, status: WORKOUT_STATUS.CANCELLED }
            : workout
        )
      );
      
      return { success: true, message: "Entrenamiento cancelado" };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar entrenamiento programado
  const deleteScheduledWorkout = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Simular eliminación - Reemplazar con: await api.delete(`/schedule/${id}`);
      setScheduledWorkouts(prev => prev.filter(workout => workout.id !== id));
      
      return { success: true, message: MESSAGES.WORKOUT_DELETED };
      
    } catch (err) {
      setError(MESSAGES.ERROR_GENERIC);
      return { success: false, message: MESSAGES.ERROR_GENERIC };
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener entrenamientos por fecha
  const getWorkoutsByDate = useCallback((date) => {
    let dateStr;
    if (typeof date === 'string') {
      dateStr = date;
    } else {
      // Formatear fecha evitando problemas de zona horaria
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      dateStr = `${year}-${month}-${day}`;
    }
    return scheduledWorkouts.filter(workout => workout.date === dateStr);
  }, [scheduledWorkouts]);

  // Obtener estadísticas de la semana
  const getWeekStats = useCallback(() => {
    const today = new Date();
    const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

    const weekWorkouts = scheduledWorkouts.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= weekStart && workoutDate <= weekEnd;
    });

    return {
      total: weekWorkouts.length,
      completed: weekWorkouts.filter(w => w.status === WORKOUT_STATUS.COMPLETED).length,
      scheduled: weekWorkouts.filter(w => w.status === WORKOUT_STATUS.SCHEDULED).length,
      cancelled: weekWorkouts.filter(w => w.status === WORKOUT_STATUS.CANCELLED).length
    };
  }, [scheduledWorkouts]);

  // Cargar entrenamientos al montar el componente
  useEffect(() => {
    fetchScheduledWorkouts();
  }, [fetchScheduledWorkouts]);

  return {
    scheduledWorkouts,
    loading,
    error,
    fetchScheduledWorkouts,
    scheduleWorkout,
    updateScheduledWorkout,
    completeWorkout,
    cancelWorkout,
    deleteScheduledWorkout,
    getWorkoutsByDate,
    getWeekStats
  };
};