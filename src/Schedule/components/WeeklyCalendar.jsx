import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { WORKOUT_STATUS } from "../../globalSources/constants/mockData";

// Función utilitaria para formatear fechas evitando problemas de zona horaria
const formatDateToString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const WeeklyCalendar = ({
  scheduledWorkouts,
  onDateSelect,
  selectedDate,
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Obtener el inicio de la semana (lunes)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajustar para que lunes sea el primer día
    return new Date(d.setDate(diff));
  };

  // Generar los días de la semana
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentWeek);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Navegar semana
  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newWeek);
  };

  // Obtener entrenamientos para una fecha específica
  const getWorkoutsForDate = (date) => {
    const dateStr = formatDateToString(date);
    return scheduledWorkouts.filter((workout) => workout.date === dateStr);
  };

  // Formatear fecha para mostrar
  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      month: "short",
      year: "numeric",
    });
  };

  const formatDayName = (date) => {
    return date.toLocaleDateString("es-ES", { weekday: "short" });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    const dateStr = formatDateToString(date);
    return dateStr === selectedDate;
  };

  const weekDays = getWeekDays();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
        </h3>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={() => setCurrentWeek(new Date())}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Hoy
          </button>

          <button
            onClick={() => navigateWeek(1)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Grid del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, index) => {
          const dayWorkouts = getWorkoutsForDate(day);
          const completedCount = dayWorkouts.filter(
            (w) => w.status === WORKOUT_STATUS.COMPLETED
          ).length;
          const scheduledCount = dayWorkouts.filter(
            (w) => w.status === WORKOUT_STATUS.SCHEDULED
          ).length;
          const cancelledCount = dayWorkouts.filter(
            (w) => w.status === WORKOUT_STATUS.CANCELLED
          ).length;

          return (
            <div
              key={index}
              onClick={() => onDateSelect(formatDateToString(day))}
              className={`
                min-h-24 p-2 rounded-lg cursor-pointer transition-all duration-200 border-2
                ${
                  isSelected(day)
                    ? "border-red-400 bg-red-100 shadow-md"
                    : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                }
                ${isToday(day) ? "ring-2 ring-blue-200" : ""}
              `}
            >
              {/* Nombre del día */}
              <div className="text-center mb-2">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  {formatDayName(day)}
                </div>
                <div
                  className={`text-lg font-bold ${
                    isSelected(day) 
                      ? "text-red-700" 
                      : isToday(day) 
                        ? "text-blue-600" 
                        : "text-gray-800"
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>

              {/* Indicadores de entrenamientos */}
              <div className="space-y-1">
                {completedCount > 0 && (
                  <div className="flex items-center justify-center">
                    <div className="w-full h-1.5 bg-green-400 rounded-full">
                      <div className="text-xs text-center text-green-700 font-medium">
                        {completedCount}
                      </div>
                    </div>
                  </div>
                )}

                {scheduledCount > 0 && (
                  <div className="flex items-center justify-center">
                    <div className="w-full h-1.5 bg-blue-400 rounded-full">
                      <div className="text-xs text-center text-blue-700 font-medium">
                        {scheduledCount}
                      </div>
                    </div>
                  </div>
                )}

                {cancelledCount > 0 && (
                  <div className="flex items-center justify-center">
                    <div className="w-full h-1.5 bg-red-400 rounded-full">
                      <div className="text-xs text-center text-red-700 font-medium">
                        {cancelledCount}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Punto indicador si hay entrenamientos */}
              {dayWorkouts.length > 0 && (
                <div className="flex justify-center mt-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1.5 bg-green-400 rounded-full"></div>
            <span className="text-gray-600">Completado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1.5 bg-blue-400 rounded-full"></div>
            <span className="text-gray-600">Programado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1.5 bg-red-400 rounded-full"></div>
            <span className="text-gray-600">Cancelado</span>
          </div>
        </div>
      </div>
    </div>
  );
};
