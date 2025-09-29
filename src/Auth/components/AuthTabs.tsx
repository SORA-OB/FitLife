import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export const AuthTabs = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/';
    const isRegister = location.pathname === '/register';
    const indicatorRef = useRef<HTMLDivElement>(null);
    const loginTabRef = useRef<HTMLAnchorElement>(null);
    const registerTabRef = useRef<HTMLAnchorElement>(null);

    // Función para actualizar la posición del indicador
    useEffect(() => {
        if (indicatorRef.current && loginTabRef.current && registerTabRef.current) {
            const activeTab = isLogin ? loginTabRef.current : registerTabRef.current;
            const indicator = indicatorRef.current;
            
            // Obtener posición y ancho de la pestaña activa
            const tabRect = activeTab.getBoundingClientRect();
            const containerRect = activeTab.parentElement?.getBoundingClientRect();
            
            if (containerRect) {
                const leftPosition = tabRect.left - containerRect.left;
                const width = tabRect.width;
                
                // Animar el indicador a la nueva posición
                indicator.style.left = `${leftPosition}px`;
                indicator.style.width = `${width}px`;
            }
        }
    }, [isLogin, isRegister]);

    return (
        <div className="relative flex mb-12 border-b border-gray-200 tab-container">
            <Link 
                ref={loginTabRef}
                to="/"
                className={`tab-link pb-3 px-4 text-xl font-bold cursor-pointer transition-all duration-300 no-underline relative z-10 ${
                    isLogin 
                        ? 'text-gray-900' 
                        : 'text-gray-500 hover:text-gray-700'
                }`}
                style={{
                    textDecoration: 'none'
                }}
            >
                INICIAR SESIÓN
            </Link>
            <Link 
                ref={registerTabRef}
                to="/register"
                className={`tab-link pb-3 px-4 text-xl font-bold cursor-pointer transition-all duration-300 no-underline relative z-10 ${
                    isRegister 
                        ? 'text-gray-900' 
                        : 'text-gray-500 hover:text-gray-700'
                }`}
                style={{
                    textDecoration: 'none'
                }}
            >
                REGISTRATE
            </Link>
            
            {/* Indicador deslizante animado */}
            <div 
                ref={indicatorRef}
                className="tab-indicator absolute bottom-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-t-sm shadow-lg shadow-red-500/25"
                style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        </div>
    );
};