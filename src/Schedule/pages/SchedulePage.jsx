import React, { useState } from "react";
import {
    FiPlus,
    FiCalendar,
    FiClock,
    FiTarget,
    FiTrendingUp,
} from "react-icons/fi";
import { useSchedule } from "../hooks/useSchedule";
import { WorkoutCard } from "../components/WorkoutCard";
import { ScheduleWorkoutForm } from "../components/ScheduleWorkoutForm";
import { WeeklyCalendar } from "../components/WeeklyCalendar";

export const SchedulePage = () => {
    const {
        scheduledWorkouts,
        loading,
        error,
        scheduleWorkout,
        updateScheduledWorkout,
        completeWorkout,
        cancelWorkout,
        deleteScheduledWorkout,
        getWorkoutsByDate,
        getWeekStats,
    } = useSchedule();

    // Estados para modales y filtros
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        // Formatear fecha actual evitando problemas de zona horaria
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    });
    const [viewMode, setViewMode] = useState("calendar"); // 'calendar' | 'list'  // Obtener estadísticas de la semana
    const weekStats = getWeekStats();

    // Obtener entrenamientos del día seleccionado
    const todaysWorkouts = getWorkoutsByDate(selectedDate);

    // Handlers
    const handleScheduleWorkout = () => {
        setSelectedWorkout(null);
        setIsFormOpen(true);
    };

    const handleEditWorkout = (workout) => {
        setSelectedWorkout(workout);
        setIsFormOpen(true);
    };

    const handleCompleteWorkout = async (id) => {
        await completeWorkout(id);
    };

    const handleCancelWorkout = async (id) => {
        await cancelWorkout(id);
    };

    const handleDeleteWorkout = async (id) => {
        await deleteScheduledWorkout(id);
    };

    const handleFormSubmit = async (formData) => {
        if (selectedWorkout) {
            await updateScheduledWorkout(selectedWorkout.id, formData);
        } else {
            await scheduleWorkout(formData);
        }
    };

    const formatSelectedDate = () => {
        // Crear fecha desde el string selectedDate evitando problemas de zona horaria
        const [year, month, day] = selectedDate.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Agenda de Entrenamientos
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Planifica y organiza tus sesiones de entrenamiento
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Toggle de vista */}
                    <div className="flex rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("calendar")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors mr-2 ${
                                viewMode === "calendar"
                                    ? "bg-white text-gray-800 shadow-sm"
                                    : "text-black hover:text-gray-800"
                            }`}
                        >
                            <FiCalendar className="inline mr-2" size={16} />
                            Calendario
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                viewMode === "list"
                                    ? "bg-white text-gray-800 shadow-sm"
                                    : "text-black hover:text-gray-800"
                            }`}
                        >
                            Lista
                        </button>
                    </div>

                    <button
                        onClick={handleScheduleWorkout}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg shadow-red-500/25"
                    >
                        <FiPlus size={20} />
                        <span>Programar Entrenamiento</span>
                    </button>
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

            {/* Contenido principal */}
            {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendario semanal */}
                    <div className="lg:col-span-2">
                        {viewMode === "calendar" ? (
                            <WeeklyCalendar
                                scheduledWorkouts={scheduledWorkouts}
                                onDateSelect={setSelectedDate}
                                selectedDate={selectedDate}
                            />
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Todos los Entrenamientos
                                </h3>
                                {scheduledWorkouts.length === 0 ? (
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                                        <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-gray-600 text-lg mb-2">
                                            No tienes entrenamientos programados
                                        </p>
                                        <p className="text-gray-500 text-sm mb-6">
                                            Programa tu primer entrenamiento para comenzar
                                        </p>
                                        <button
                                            onClick={handleScheduleWorkout}
                                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200"
                                        >
                                            <FiPlus size={20} />
                                            <span>Programar Primer Entrenamiento</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {scheduledWorkouts
                                            .sort(
                                                (a, b) =>
                                                    new Date(a.date + " " + a.time) -
                                                    new Date(b.date + " " + b.time)
                                            )
                                            .map((workout) => (
                                                <WorkoutCard
                                                    key={workout.id}
                                                    workout={workout}
                                                    onComplete={handleCompleteWorkout}
                                                    onCancel={handleCancelWorkout}
                                                    onEdit={handleEditWorkout}
                                                    onDelete={handleDeleteWorkout}
                                                    showDate={true}
                                                />
                                            ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Panel lateral - Entrenamientos del día seleccionado */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                {formatSelectedDate()}
                            </h3>

                            {todaysWorkouts.length === 0 ? (
                                <div className="text-center py-8">
                                    <FiClock className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                                    <p className="text-gray-600 mb-4">
                                        No hay entrenamientos programados
                                    </p>
                                    <button
                                        onClick={handleScheduleWorkout}
                                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                                    >
                                        Programar entrenamiento
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {todaysWorkouts
                                        .sort((a, b) => a.time.localeCompare(b.time))
                                        .map((workout) => (
                                            <WorkoutCard
                                                key={workout.id}
                                                workout={workout}
                                                onComplete={handleCompleteWorkout}
                                                onCancel={handleCancelWorkout}
                                                onEdit={handleEditWorkout}
                                                onDelete={handleDeleteWorkout}
                                                showDate={false}
                                            />
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de formulario */}
            <ScheduleWorkoutForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
                workout={selectedWorkout}
                loading={loading}
            />
        </div>
    );
};
