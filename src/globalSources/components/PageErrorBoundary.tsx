import React, { Component, ReactNode } from 'react';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

export class PageErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Actualiza el estado para mostrar la UI de error
        return { 
            hasError: true,
            error 
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Puedes registrar el error en un servicio de reporte de errores
        this.setState({
            error,
            errorInfo
        });
        
        console.error('Error Boundary capturó un error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ 
            hasError: false, 
            error: undefined, 
            errorInfo: undefined 
        });
    };

    render() {
        if (this.state.hasError) {
            // Si se proporciona un fallback personalizado, usarlo
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // UI de error por defecto
            return (
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="max-w-md w-full text-center">
                        {/* Icono de error */}
                        <div className="mx-auto flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                            <FiAlertTriangle className="w-10 h-10 text-red-500" />
                        </div>

                        {/* Título del error */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            ¡Oops! Algo salió mal
                        </h1>

                        {/* Descripción del error */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            La página que estás buscando no existe o ha ocurrido un error inesperado. 
                            No te preocupes, puedes intentar las siguientes opciones:
                        </p>

                        {/* Información del error (solo en desarrollo) */}
                        {this.state.error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                                <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
                                <p className="text-sm text-red-700 font-mono break-all">
                                    {this.state.error.message}
                                </p>
                                {this.state.error.stack && (
                                    <details className="mt-2">
                                        <summary className="cursor-pointer text-red-600 hover:text-red-800">
                                            Stack Trace
                                        </summary>
                                        <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
                                            {this.state.error.stack}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        )}

                        {/* Acciones */}
                        <div className="space-y-3">
                            {/* Botón de retry */}
                            <button
                                onClick={this.handleRetry}
                                className="w-full flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                                <FiRefreshCw className="w-5 h-5 mr-2" />
                                Intentar de Nuevo
                            </button>

                            {/* Botón de ir al home */}
                            <Link
                                to="/home"
                                className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                                <FiHome className="w-5 h-5 mr-2" />
                                Ir al Dashboard
                            </Link>
                        </div>

                        {/* Mensaje de ayuda */}
                        <p className="mt-6 text-sm text-gray-500">
                            Si el problema persiste, por favor contacta al soporte técnico.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook para crear error boundaries funcionales (para casos específicos)
export const useErrorHandler = () => {
    const throwError = (error: Error) => {
        throw error;
    };

    const handleAsyncError = (error: Error) => {
        console.error('Async Error:', error);
        // Aquí podrías enviar el error a un servicio de monitoreo
    };

    return { throwError, handleAsyncError };
};

// Componente de Error para rutas no encontradas (404)
export const NotFoundPage = () => {
    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                {/* Ilustración 404 */}
                <div className="mx-auto mb-8">
                    <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
                    <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
                </div>

                {/* Contenido */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Página no encontrada
                </h1>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                    La página que buscas no existe o ha sido movida. 
                    Verifica la URL o regresa al dashboard.
                </p>

                {/* Acciones */}
                <div className="space-y-3">
                    <Link
                        to="/home"
                        className="w-full flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                        <FiHome className="w-5 h-5 mr-2" />
                        Ir al Dashboard
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="w-full px-6 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors duration-200"
                    >
                        ← Volver atrás
                    </button>
                </div>
            </div>
        </div>
    );
};