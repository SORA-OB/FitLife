import { ReactNode, useState, useEffect } from "react";
import { AuthTabs } from "../components/AuthTabs";

interface Props {
    children: ReactNode;
}

export const LoginRegister: React.FC<Props> = ({ children }) => {
    const frases = [
        "La disciplina es el puente entre tus metas y tus logros",
        "El progreso no es perfección, es consistencia",
        "Tu cuerpo puede resistir, es tu mente la que debes convencer",
        "Cada día es una nueva oportunidad para ser mejor",
        "El único mal entrenamiento es el que no haces",
        "El éxito es la suma de pequeños esfuerzos repetidos día tras día",
    ];

    const [fraseActual, setFraseActual] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setFraseActual((prev) => (prev + 1) % frases.length);
        }, 4000);

        return () => clearInterval(intervalo);
    }, [frases.length]);

    return (
        <div className="bg-gray-50 min-h-screen w-screen flex justify-center items-center">
            <div className="flex flex-row shadow-2xl rounded-2xl overflow-hidden">
                {/* Panel izquierdo con frase + imagen */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-red-800 to-red-400 h-[581.6px] w-[423px] p-10">
                    {/* Frase */}
                    <div className="flex justify-center  flex-1">
                        <p className="text-white text-[21px] font-sans font-light italic text-center">
                            "{frases[fraseActual]}"
                        </p>
                    </div>

                    {/* Imagen */}
                    <div className="flex justify-center mb-8">
                        <img
                            src="./man.png"
                            alt="Ilustración de un hombre entrenando"
                            className="h-[238px] max-h-[271px] object-contain"
                        />
                    </div>
                </div>

                {/* Panel derecho con children */}
                <div className="bg-white h-[581px] w-[528px] flex flex-col">
                    <div className="p-8 pb-0">
                        <AuthTabs />
                    </div>
                    <main className="form-container flex-1 w-full relative overflow-hidden">
                        <div className="absolute inset-0 flex justify-center px-8 py-4">
                            <div className="w-full max-w-md">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
