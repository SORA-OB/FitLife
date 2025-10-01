// Datos simulados para ejercicios - Posteriormente reemplazados por API
export const MOCK_EXERCISES = [
  {
    id: 101,
    grupoMuscular: "Bíceps",
    nombre: "Curl de bíceps",
    descripcion: "Ejercicio con mancuernas de pie para fortalecer los músculos del bíceps"
  },
  {
    id: 102,
    grupoMuscular: "Tríceps",
    nombre: "Extensión de tríceps en polea",
    descripcion: "Ejercicio con barra recta en polea para definir tríceps"
  },
  {
    id: 103,
    grupoMuscular: "Bíceps",
    nombre: "Martillo",
    descripcion: "Curl martillo con mancuernas para trabajar bíceps y antebrazos"
  },
  {
    id: 104,
    grupoMuscular: "Pecho",
    nombre: "Press de banca",
    descripcion: "Ejercicio básico para desarrollo del pecho con barra"
  },
  {
    id: 105,
    grupoMuscular: "Pecho",
    nombre: "Flexiones",
    descripcion: "Ejercicio con peso corporal para fortalecer pecho y brazos"
  },
  {
    id: 106,
    grupoMuscular: "Espalda",
    nombre: "Dominadas",
    descripcion: "Ejercicio de tracción para desarrollar la espalda superior"
  },
  {
    id: 107,
    grupoMuscular: "Piernas",
    nombre: "Sentadillas",
    descripcion: "Ejercicio compuesto para fortalecer cuádriceps y glúteos"
  },
  {
    id: 108,
    grupoMuscular: "Hombros",
    nombre: "Press militar",
    descripcion: "Ejercicio con barra para desarrollar hombros y core"
  }
];

// Datos simulados para rutinas
export const MOCK_ROUTINES = [
  {
    id: 1,
    titulo: "Bíceps y Tríceps",
    dias: ["Lunes", "Miércoles", "Viernes"],
    ejercicios: [
      {
        id: 101,
        grupoMuscular: "Bíceps",
        nombre: "Curl de bíceps",
        descripcion: "Ejercicio con mancuernas de pie para fortalecer los músculos del bíceps",
        series: 3,
        repeticiones: 12,
        peso: 6
      },
      {
        id: 103,
        grupoMuscular: "Bíceps",
        nombre: "Martillo",
        descripcion: "Curl martillo con mancuernas para trabajar bíceps y antebrazos",
        series: 3,
        repeticiones: 12,
        peso: 8
      },
      {
        id: 102,
        grupoMuscular: "Tríceps",
        nombre: "Extensión de tríceps en polea",
        descripcion: "Ejercicio con barra recta en polea para definir tríceps",
        series: 4,
        repeticiones: 10,
        peso: 12
      }
    ]
  },
  {
    id: 2,
    titulo: "Pecho y Espalda",
    dias: ["Martes", "Jueves", "Sábado"],
    ejercicios: [
      {
        id: 104,
        grupoMuscular: "Pecho",
        nombre: "Press de banca",
        descripcion: "Ejercicio básico para desarrollo del pecho con barra",
        series: 4,
        repeticiones: 8,
        peso: 40
      },
      {
        id: 105,
        grupoMuscular: "Pecho",
        nombre: "Flexiones",
        descripcion: "Ejercicio con peso corporal para fortalecer pecho y brazos",
        series: 3,
        repeticiones: 15,
        peso: 0
      },
      {
        id: 106,
        grupoMuscular: "Espalda",
        nombre: "Dominadas",
        descripcion: "Ejercicio de tracción para desarrollar la espalda superior",
        series: 3,
        repeticiones: 8,
        peso: 0
      }
    ]
  }
];

// Grupos musculares disponibles
export const MUSCLE_GROUPS = [
  "Bíceps",
  "Tríceps", 
  "Pecho",
  "Espalda",
  "Hombros",
  "Piernas",
  "Abdomen",
  "Glúteos"
];

// Días de la semana
export const DAYS_OF_WEEK = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

// Mensajes de la aplicación
export const MESSAGES = {
  EXERCISE_CREATED: "Ejercicio creado exitosamente",
  EXERCISE_UPDATED: "Ejercicio actualizado exitosamente",
  EXERCISE_DELETED: "Ejercicio eliminado exitosamente",
  ROUTINE_CREATED: "Rutina creada exitosamente",
  ROUTINE_UPDATED: "Rutina actualizada exitosamente",
  ROUTINE_DELETED: "Rutina eliminada exitosamente",
  CONFIRM_DELETE: "¿Estás seguro de que deseas eliminar este elemento?",
  ERROR_GENERIC: "Ha ocurrido un error. Inténtalo de nuevo.",
  REQUIRED_FIELDS: "Por favor completa todos los campos requeridos"
};