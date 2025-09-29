# Error Boundary System - FitLife

## 📋 Descripción
Sistema de manejo de errores que mantiene visible el sidebar y header cuando ocurren errores en el contenido principal de las páginas.

## 🏗️ Arquitectura

### 1. **PageErrorBoundary**
- **Ubicación**: `src/globalSources/components/PageErrorBoundary.tsx`
- **Propósito**: Captura errores solo en el contenido principal
- **Características**:
  - Mantiene sidebar y header visibles
  - Muestra UI de error amigable
  - Botón de retry automático
  - Información de debug en desarrollo

### 2. **MainLayout** 
- **Ubicación**: `src/globalSources/layouts/MainLayout.tsx`
- **Integración**: Envuelve solo el contenido `{children}` con el ErrorBoundary
- **Estructura**:
  ```
  MainLayout
  ├── Sidebar (siempre visible)
  ├── Header (siempre visible)
  └── PageErrorBoundary
      └── Contenido de la página
  ```

### 3. **NotFoundPage (404)**
- **Ubicación**: Incluida en `PageErrorBoundary.tsx`
- **Uso**: Ruta `*` en `App.jsx` para páginas no encontradas
- **Características**: Mantiene layout principal visible

## 🚀 Características

### ✅ **Error Handling**
- Errores síncronos ✅
- Errores asíncronos (con hook) ✅
- Rutas no encontradas (404) ✅
- Stack trace en desarrollo ✅

### ✅ **UX/UI**
- Sidebar y header permanecen visibles ✅
- Botones de retry y navegación ✅
- Diseño consistente con la app ✅
- Mensajes de error amigables ✅

### ✅ **Funcionalidades**
- Retry automático ✅
- Navegación de regreso ✅
- Logging de errores ✅
- Hook personalizado para manejo de errores ✅

## 🧪 Testing

### Componente de Prueba
- **Ubicación**: `src/Home/components/ErrorTestComponent.tsx`
- **Acceso**: Disponible en el Dashboard (`/home`)
- **Tipos de Error**:
  - Error síncrono (render error)
  - Error asíncrono (con timeout)

### Cómo Probar
1. Navegar a `/home`
2. Usar los botones de prueba de errores
3. Observar que sidebar y header permanecen visibles
4. Probar botones de retry y navegación
5. Visitar una ruta inexistente (ej: `/ruta-que-no-existe`)

## 📁 Estructura de Archivos
```
src/
├── globalSources/
│   ├── components/
│   │   ├── sidebar.tsx
│   │   └── PageErrorBoundary.tsx
│   └── layouts/
│       └── MainLayout.tsx
├── Home/
│   ├── components/
│   │   └── ErrorTestComponent.tsx
│   └── pages/
│       └── Home.tsx
└── App.jsx (rutas configuradas)
```

## 🛠️ Uso

### Implementación en nuevas páginas:
```jsx
// Página que usa el layout con error boundary
const NewPage = () => (
    <MainLayout>
        <YourPageContent />
    </MainLayout>
);

// El ErrorBoundary se aplica automáticamente
```

### Hook para errores asíncronos:
```jsx
import { useErrorHandler } from './globalSources/components/PageErrorBoundary';

const MyComponent = () => {
    const { throwError, handleAsyncError } = useErrorHandler();
    
    const handleAsyncOperation = async () => {
        try {
            await riskyAsyncOperation();
        } catch (error) {
            handleAsyncError(error);
        }
    };
};
```

## 🎯 Beneficios
- **UX Consistente**: Layout siempre disponible
- **Navegación Intacta**: Usuario puede seguir navegando
- **Error Recovery**: Fácil recuperación de errores
- **Debug Friendly**: Información detallada en desarrollo
- **Escalable**: Fácil de extender para nuevas páginas