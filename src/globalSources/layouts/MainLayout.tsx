import React from 'react';
import { Sidebar } from '../components/sidebar.tsx';
import { PageErrorBoundary } from '../components/PageErrorBoundary';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Fijo */}
            <Sidebar />
            
            {/* Contenido principal */}
            <main className="flex-1 flex flex-col">
                {/* Header superior */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Título de la página */}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">FitLife</h1>
                                <p className="text-sm text-gray-500">Bienvenido de vuelta</p>
                            </div>
                        </div>

                        {/* Acciones del header */}
                        <div className="flex items-center space-x-4">
                            {/* Notificaciones */}
                            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5h-5m-10 10h5l-5-5 5-5H5" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            {/* Avatar del usuario */}
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">JD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Contenido de la página con Error Boundary */}
                <div className="flex-1 overflow-auto">
                    <PageErrorBoundary>
                        <div className="p-6">
                            {children}
                        </div>
                    </PageErrorBoundary>
                </div>
            </main>
        </div>
    );
};