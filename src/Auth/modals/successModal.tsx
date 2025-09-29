import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

export const SuccessModal = ({ isOpen, onClose, message = "¡Bienvenido a FitLife!" }: Props) => {
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        if (isOpen && !isClosing) {
            const timer = setTimeout(() => {
                // Iniciar animación de salida
                setIsClosing(true);
                
                // Esperar a que termine la animación antes de cerrar
                setTimeout(() => {
                    onClose();
                    navigate("/home");
                    setIsClosing(false);
                }, 800); // Duración de la animación de salida
            }, 3000); // Tiempo antes de iniciar el cierre
            
            return () => clearTimeout(timer);
        }
    }

    useEffect(closeModal, [isOpen, onClose, isClosing]);

    if (!isOpen && !isClosing) return null

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${
            isClosing 
                ? 'animate-backgroundFadeOut backdrop-brightness-100 backdrop-blur-none' 
                : 'animate-fadeIn backdrop-brightness-50 backdrop-blur-sm'
        }`}>
            <div className={`bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 w-[400px] max-w-[90vw] text-center relative ${
                isClosing 
                    ? 'animate-slideToBack' 
                    : 'animate-fadeIn transform transition-all duration-300'
            }`}>
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{message}</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    Bienvenido de nuevo, nos alegra verte 💜
                </p>
                <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className={`h-2 rounded-full transition-all duration-300 ${
                            isClosing 
                                ? 'bg-orange-500 animate-pulse' 
                                : 'bg-green-500'
                        }`} 
                        style={{
                            width: '100%',
                            animation: isClosing ? 'pulse 0.5s infinite' : 'progressBar 3s linear forwards'
                        }}></div>
                    </div>
                    <p className={`text-sm mt-2 transition-colors duration-300 ${
                        isClosing 
                            ? 'text-orange-500 font-medium' 
                            : 'text-gray-400'
                    }`}>
                        {isClosing ? '✨ Preparando tu experiencia...' : 'Redirigiendo en unos segundos...'}
                    </p>
                </div>
            </div>
        </div>
    )
}