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

// Datos simulados para entrenamientos programados
export const MOCK_SCHEDULED_WORKOUTS = [
  {
    id: 1,
    date: "2025-10-01",
    time: "08:00",
    routineId: 1,
    routine: {
      id: 1,
      titulo: "Bíceps y Tríceps",
      ejercicios: [
        { nombre: "Curl de bíceps", series: 3, repeticiones: 12, peso: 6 },
        { nombre: "Martillo", series: 3, repeticiones: 12, peso: 8 },
        { nombre: "Extensión de tríceps en polea", series: 4, repeticiones: 10, peso: 12 }
      ]
    },
    status: "programado", // programado, completado, cancelado
    notes: "Entrenar en el gimnasio principal"
  },
  {
    id: 2,
    date: "2025-10-02",
    time: "18:30",
    routineId: 2,
    routine: {
      id: 2,
      titulo: "Pecho y Espalda",
      ejercicios: [
        { nombre: "Press de banca", series: 4, repeticiones: 8, peso: 40 },
        { nombre: "Flexiones", series: 3, repeticiones: 15, peso: 0 },
        { nombre: "Dominadas", series: 3, repeticiones: 8, peso: 0 }
      ]
    },
    status: "completado",
    notes: "Excelente sesión"
  },
  {
    id: 3,
    date: "2025-10-03",
    time: "07:30",
    routineId: 1,
    routine: {
      id: 1,
      titulo: "Bíceps y Tríceps",
      ejercicios: [
        { nombre: "Curl de bíceps", series: 3, repeticiones: 12, peso: 6 },
        { nombre: "Martillo", series: 3, repeticiones: 12, peso: 8 },
        { nombre: "Extensión de tríceps en polea", series: 4, repeticiones: 10, peso: 12 }
      ]
    },
    status: "programado",
    notes: ""
  },
  {
    id: 4,
    date: "2025-10-03",
    time: "19:00",
    routineId: 3,
    routine: {
      id: 3,
      titulo: "Piernas Completo",
      ejercicios: [
        { nombre: "Sentadillas", series: 4, repeticiones: 12, peso: 20 },
        { nombre: "Peso muerto", series: 3, repeticiones: 10, peso: 30 },
        { nombre: "Extensión de cuádriceps", series: 3, repeticiones: 15, peso: 15 }
      ]
    },
    status: "programado",
    notes: "Sesión de piernas intensiva"
  },
  {
    id: 5,
    date: "2025-10-04",
    time: "09:00",
    routineId: 2,
    routine: {
      id: 2,
      titulo: "Pecho y Espalda",
      ejercicios: [
        { nombre: "Press de banca", series: 4, repeticiones: 8, peso: 40 },
        { nombre: "Flexiones", series: 3, repeticiones: 15, peso: 0 },
        { nombre: "Dominadas", series: 3, repeticiones: 8, peso: 0 }
      ]
    },
    status: "programado",
    notes: "Sesión matutina"
  }
];

// Estados de entrenamientos
export const WORKOUT_STATUS = {
  SCHEDULED: "programado",
  COMPLETED: "completado",
  CANCELLED: "cancelado"
};

// Mensajes de la aplicación
export const MESSAGES = {
  EXERCISE_CREATED: "Ejercicio creado exitosamente",
  EXERCISE_UPDATED: "Ejercicio actualizado exitosamente",
  EXERCISE_DELETED: "Ejercicio eliminado exitosamente",
  ROUTINE_CREATED: "Rutina creada exitosamente",
  ROUTINE_UPDATED: "Rutina actualizada exitosamente",
  ROUTINE_DELETED: "Rutina eliminada exitosamente",
  WORKOUT_SCHEDULED: "Entrenamiento programado exitosamente",
  WORKOUT_UPDATED: "Entrenamiento actualizado exitosamente",
  WORKOUT_DELETED: "Entrenamiento eliminado exitosamente",
  WORKOUT_COMPLETED: "¡Entrenamiento completado! ¡Buen trabajo!",
  FOOD_CREATED: "Alimento agregado exitosamente",
  FOOD_UPDATED: "Alimento actualizado exitosamente",
  FOOD_DELETED: "Alimento eliminado exitosamente",
  MEAL_CREATED: "Comida registrada exitosamente",
  MEAL_UPDATED: "Comida actualizada exitosamente",
  MEAL_DELETED: "Comida eliminada exitosamente",
  NUTRITION_PLAN_CREATED: "Plan nutricional creado exitosamente",
  NUTRITION_PLAN_UPDATED: "Plan nutricional actualizado exitosamente",
  NUTRITION_PLAN_DELETED: "Plan nutricional eliminado exitosamente",
  CONFIRM_DELETE: "¿Estás seguro de que deseas eliminar este elemento?",
  ERROR_GENERIC: "Ha ocurrido un error. Inténtalo de nuevo.",
  REQUIRED_FIELDS: "Por favor completa todos los campos requeridos"
};

// ========== DATOS DE NUTRICIÓN ==========

// Base de datos de alimentos
export const MOCK_FOODS = [
  {
    id: 1,
    nombre: "Pechuga de Pollo",
    categoria: "Proteínas",
    calorias: 165, // por 100g
    proteinas: 31,
    carbohidratos: 0,
    grasas: 3.6,
    fibra: 0,
    azucares: 0,
    porciones: {
      "100g": { multiplier: 1, nombre: "100 gramos" },
      "150g": { multiplier: 1.5, nombre: "150 gramos (porción grande)" },
      "80g": { multiplier: 0.8, nombre: "80 gramos (porción pequeña)" }
    }
  },
  {
    id: 2,
    nombre: "Arroz Integral",
    categoria: "Carbohidratos",
    calorias: 111,
    proteinas: 2.6,
    carbohidratos: 22,
    grasas: 0.9,
    fibra: 1.8,
    azucares: 0.4,
    porciones: {
      "100g": { multiplier: 1, nombre: "100 gramos" },
      "80g": { multiplier: 0.8, nombre: "80 gramos (1/2 taza)" },
      "150g": { multiplier: 1.5, nombre: "150 gramos (3/4 taza)" }
    }
  },
  {
    id: 3,
    nombre: "Aguacate",
    categoria: "Grasas Saludables",
    calorias: 160,
    proteinas: 2,
    carbohidratos: 9,
    grasas: 15,
    fibra: 7,
    azucares: 0.7,
    porciones: {
      "100g": { multiplier: 1, nombre: "100 gramos" },
      "50g": { multiplier: 0.5, nombre: "1/2 aguacate mediano" },
      "25g": { multiplier: 0.25, nombre: "1/4 aguacate mediano" }
    }
  },
  {
    id: 4,
    nombre: "Banana",
    categoria: "Frutas",
    calorias: 89,
    proteinas: 1.1,
    carbohidratos: 23,
    grasas: 0.3,
    fibra: 2.6,
    azucares: 12,
    porciones: {
      "100g": { multiplier: 1, nombre: "100 gramos" },
      "120g": { multiplier: 1.2, nombre: "1 banana mediana" },
      "80g": { multiplier: 0.8, nombre: "1 banana pequeña" }
    }
  },
  {
    id: 5,
    nombre: "Avena",
    categoria: "Carbohidratos",
    calorias: 389,
    proteinas: 17,
    carbohidratos: 66,
    grasas: 7,
    fibra: 11,
    azucares: 1,
    porciones: {
      "40g": { multiplier: 0.4, nombre: "40g (porción estándar)" },
      "50g": { multiplier: 0.5, nombre: "50g (porción grande)" },
      "30g": { multiplier: 0.3, nombre: "30g (porción pequeña)" }
    }
  },
  {
    id: 6,
    nombre: "Salmón",
    categoria: "Proteínas",
    calorias: 208,
    proteinas: 25,
    carbohidratos: 0,
    grasas: 12,
    fibra: 0,
    azucares: 0,
    porciones: {
      "100g": { multiplier: 1, nombre: "100 gramos" },
      "150g": { multiplier: 1.5, nombre: "150 gramos (filete grande)" },
      "120g": { multiplier: 1.2, nombre: "120 gramos (filete mediano)" }
    }
  },
  {
    id: 7,
    nombre: "Brócoli",
    categoria: "Vegetales",
    calorias: 34,
    proteinas: 2.8,
    carbohidratos: 7,
    grasas: 0.4,
    fibra: 2.6,
    azucares: 1.5,
    porciones: {
      "100g": { multiplier: 1, nombre: "100 gramos" },
      "150g": { multiplier: 1.5, nombre: "150 gramos (1 taza)" },
      "80g": { multiplier: 0.8, nombre: "80 gramos (3/4 taza)" }
    }
  },
  {
    id: 8,
    nombre: "Almendras",
    categoria: "Grasas Saludables",
    calorias: 579,
    proteinas: 21,
    carbohidratos: 22,
    grasas: 50,
    fibra: 12,
    azucares: 4,
    porciones: {
      "30g": { multiplier: 0.3, nombre: "30g (puñado pequeño)" },
      "40g": { multiplier: 0.4, nombre: "40g (puñado grande)" },
      "20g": { multiplier: 0.2, nombre: "20g (1 cucharada)" }
    }
  }
];

// Categorías de alimentos
export const FOOD_CATEGORIES = [
  "Proteínas",
  "Carbohidratos", 
  "Grasas Saludables",
  "Frutas",
  "Vegetales",
  "Lácteos",
  "Granos",
  "Legumbres"
];

// Tipos de comidas
export const MEAL_TYPES = [
  { id: "desayuno", nombre: "Desayuno", icon: "☀️" },
  { id: "media_manana", nombre: "Media Mañana", icon: "🥤" },
  { id: "almuerzo", nombre: "Almuerzo", icon: "🍽️" },
  { id: "merienda", nombre: "Merienda", icon: "🥨" },
  { id: "cena", nombre: "Cena", icon: "🌙" }
];

// Comidas registradas (ejemplo de seguimiento diario)
export const MOCK_MEALS = [
  {
    id: 1,
    fecha: "2025-10-01",
    tipo: "desayuno",
    alimentos: [
      {
        alimento: { ...MOCK_FOODS[4] }, // Avena
        porcion: "40g",
        cantidad: 1
      },
      {
        alimento: { ...MOCK_FOODS[3] }, // Banana
        porcion: "120g",
        cantidad: 1
      }
    ],
    totalCalorias: 262.4,
    totalProteinas: 8.12,
    totalCarbohidratos: 54.6,
    totalGrasas: 3.16,
    notas: "Desayuno post-entrenamiento"
  },
  {
    id: 2,
    fecha: "2025-10-01",
    tipo: "almuerzo",
    alimentos: [
      {
        alimento: { ...MOCK_FOODS[0] }, // Pechuga de Pollo
        porcion: "150g",
        cantidad: 1
      },
      {
        alimento: { ...MOCK_FOODS[1] }, // Arroz Integral
        porcion: "100g",
        cantidad: 1
      },
      {
        alimento: { ...MOCK_FOODS[6] }, // Brócoli
        porcion: "150g",
        cantidad: 1
      }
    ],
    totalCalorias: 408.5,
    totalProteinas: 50.7,
    totalCarbohidratos: 32.5,
    totalGrasas: 6.0,
    notas: "Almuerzo completo y balanceado"
  }
];

// Planes nutricionales
export const MOCK_NUTRITION_PLANS = [
  {
    id: 1,
    nombre: "Plan de Definición",
    objetivo: "Pérdida de grasa",
    calorias_objetivo: 1800,
    proteinas_objetivo: 140, // gramos
    carbohidratos_objetivo: 180,
    grasas_objetivo: 60,
    duracion: "8 semanas",
    descripcion: "Plan hipocalórico para definición muscular manteniendo masa magra",
    distribucion_calorica: {
      desayuno: 25, // porcentaje
      media_manana: 10,
      almuerzo: 35,
      merienda: 10,
      cena: 20
    },
    alimentos_recomendados: [1, 2, 6, 7, 8], // IDs de MOCK_FOODS
    alimentos_evitar: ["Comida procesada", "Azúcares refinados", "Frituras"]
  },
  {
    id: 2,
    nombre: "Plan de Volumen",
    objetivo: "Ganancia de masa muscular",
    calorias_objetivo: 2500,
    proteinas_objetivo: 180,
    carbohidratos_objetivo: 300,
    grasas_objetivo: 80,
    duracion: "12 semanas",
    descripcion: "Plan hipercalórico para maximizar ganancia de músculo",
    distribucion_calorica: {
      desayuno: 20,
      media_manana: 15,
      almuerzo: 30,
      merienda: 15,
      cena: 20
    },
    alimentos_recomendados: [1, 2, 4, 5, 6, 8],
    alimentos_evitar: ["Comida chatarra", "Alcohol en exceso"]
  }
];

// Estado de objetivos nutricionales
export const NUTRITION_GOALS = {
  WEIGHT_LOSS: "Pérdida de peso",
  MUSCLE_GAIN: "Ganancia muscular", 
  MAINTENANCE: "Mantenimiento",
  PERFORMANCE: "Rendimiento deportivo"
};