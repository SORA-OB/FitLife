import { useNavigate } from "react-router-dom"
import { LoginRegister } from "../layouts/LoginRegister"
import { StaticInput } from "../components/input"
import { PasswordInput } from "../components/PassInput"
import { SuccessModal } from "../modals/successModal"
import { useState, ChangeEvent } from "react"
import { useUsers } from "../hooks/Users"
import { useTransition } from "../contexts/TransitionContext"

export const Login = () => {
    /**Estados */
    const { validateLogin, isLoading } = useUsers()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState (false)
    const { animationClass } = useTransition()

    // Función para sanitizar y validar contraseña
    const sanitizePassword = (password: string): boolean => {
        // Verificar que solo contenga caracteres permitidos
        const allowedChars = /^[a-zA-Z0-9_]+$/;
        return allowedChars.test(password) && password.length >= 3 && password.length <= 50;
    }
    
    const handleLogin = async () => {
        // Validación adicional de seguridad
        if (!sanitizePassword(password)) {
            setMessage('La contraseña solo puede contener letras, números y guión bajo (_)');
            return;
        }

        const result = await validateLogin(email, password);

        setMessage(result.message);
        if (result.success) {
            console.log('Usuario logueado', result.user)
            setIsModalOpen(true);
        }
    }

    return (
        <>
            <LoginRegister>
                <div className={`w-full ${animationClass}`}>
                    {/* --- Contenedor del Formulario --- */}
                    <div className="flex flex-col space-y-4">
                        {/* Campo de Email */}
                        <StaticInput
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        <PasswordInput
                            name="password (only letters and numbers)"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />

                        {/* --- Botón de LOGIN --- */}
                        <button
                            onClick={() => handleLogin()}
                            disabled={isLoading}
                            className="w-full mt-4 py-3 text-xl font-bold text-white rounded-xl shadow-lg shadow-red-500/50 transition-all duration-200 bg-red-500 hover:bg-red-600 transform active:scale-[0.98]"
                        > {isLoading ? 'Validando...' : 'LOGIN'}
                        </button>
                        {message && <p className=" text-red-500 text-center text-m bold mt-2">{message}</p>}
                    </div>
                </div>
            </LoginRegister>
            
            {/* Modal renderizado fuera del layout */}
            <SuccessModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}