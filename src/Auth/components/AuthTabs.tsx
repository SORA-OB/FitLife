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
        <div className="relative flex mb-12 border-b border-red-200 tab-container">
            <Link 
                ref={loginTabRef}
                to="/"
                className={`tab-link pb-3 px-4 text-xl font-bold cursor-pointer transition-all duration-300 no-underline relative z-10 ${
                    isLogin 
                        ? 'text-[#CE1E1E]' 
                        : 'text-[#D67E7E] hover:text-red-500'
                }`}
                style={{
                    color: isLogin ? '#CE1E1E' : '#D67E7E',
                    textDecoration: 'none'
                }}
            >
                LOGIN
            </Link>
            <Link 
                ref={registerTabRef}
                to="/register"
                className={`tab-link pb-3 px-4 text-xl font-bold cursor-pointer transition-all duration-300 no-underline relative z-10 ${
                    isRegister 
                        ? 'text-[#CE1E1E]' 
                        : 'text-[#D67E7E] hover:text-red-500'
                }`}
                style={{
                    color: isRegister ? '#CE1E1E' : '#D67E7E',
                    textDecoration: 'none'
                }}
            >
                SIGN UP
            </Link>
            
            {/* Indicador deslizante animado */}
            <div 
                ref={indicatorRef}
                className="tab-indicator absolute bottom-0 h-1 bg-red-500 rounded-t-sm"
                style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        </div>
    );
};