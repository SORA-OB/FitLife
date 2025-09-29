import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionContextType {
    isTransitioning: boolean;
    direction: 'left' | 'right' | null;
    animationClass: string;
}

const TransitionContext = createContext<TransitionContextType>({
    isTransitioning: false,
    direction: null,
    animationClass: ''
});

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
};

interface TransitionProviderProps {
    children: React.ReactNode;
}

export const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const [animationClass, setAnimationClass] = useState('');
    const [previousPath, setPreviousPath] = useState(location.pathname);

    useEffect(() => {
        const currentPath = location.pathname;
        
        // Determinar dirección basada en las rutas
        if (previousPath !== currentPath) {
            let newDirection: 'left' | 'right' = 'right';
            
            // Login (/) -> Register (/register): deslizar hacia la izquierda (Register entra desde la derecha)
            // Register (/register) -> Login (/): deslizar hacia la derecha (Login entra desde la izquierda)
            if (previousPath === '/' && currentPath === '/register') {
                newDirection = 'left'; // Register entra desde la derecha, Login sale hacia la izquierda
            } else if (previousPath === '/register' && currentPath === '/') {
                newDirection = 'right'; // Login entra desde la izquierda, Register sale hacia la derecha
            }
            
            setDirection(newDirection);
            setIsTransitioning(true);
            
            // Determinar clase de animación
            const animClass = newDirection === 'left' ? 'form-slide-in-right' : 'form-slide-in-left';
            setAnimationClass(animClass);
            
            // Terminar transición después de la animación
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setDirection(null);
                setAnimationClass('');
            }, 500); // Duración de la animación
            
            setPreviousPath(currentPath);
            
            return () => clearTimeout(timer);
        }
    }, [location.pathname, previousPath]);

    return (
        <TransitionContext.Provider value={{ isTransitioning, direction, animationClass }}>
            {children}
        </TransitionContext.Provider>
    );
};