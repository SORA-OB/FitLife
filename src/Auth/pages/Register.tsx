
import { LoginRegister } from "../layouts/LoginRegister"
import { StaticInput } from "../components/input"
import { PasswordInput } from "../components/PassInput"
import { useState, ChangeEvent } from "react"
import { useTransition } from "../contexts/TransitionContext"
import { useUsers } from "../hooks/Users"
import { SuccessModal } from "../modals/successModal"

export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const { animationClass } = useTransition()
    const { registerUser, isLoading } = useUsers()

    // Función para sanitizar y validar contraseña
    const sanitizePassword = (password: string): boolean => {
        const allowedChars = /^[a-zA-Z0-9_]+$/;
        return allowedChars.test(password) && password.length >= 3 && password.length <= 50;
    }

    const handleRegister = () => {
        // Validar que todos los campos estén llenos
        if (!name.trim() || !email.trim() || !password.trim()) {
            setMessage('Todos los campos son obligatorios');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Por favor ingresa un email válido');
            return;
        }

        if (!sanitizePassword(password)) {
            setMessage('La contraseña solo puede contener letras, números, guión bajo (_) y debe contener al menos 5 caracteres');
            return;
        }

        // Intentar registrar el usuario
        const result = registerUser(name.trim(), email.trim(), password);
        
        if (result.success) {
            setMessage('');
            setShowSuccess(true);
            // Limpiar formulario
            setName('');
            setEmail('');
            setPassword('');
        } else {
            setMessage(result.message);
        }
    }
    return (
        <LoginRegister>
            <div className={`w-full ${animationClass}`}>
                {/* --- Contenedor del Formulario --- */}
                <div className="flex flex-col space-y-4">
                    {/* Campo de Nombre */}
                    <StaticInput
                        label="Nombre"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />

                    {/* Campo de Email */}
                    <StaticInput
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />

                    {/* Campo de Password */}
                    <PasswordInput
                        name="password (only letters and numbers)"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />

                    {/* Mostrar mensaje de error */}
                    {message && (
                        <p className="text-red-500 text-sm text-center mt-3 px-2">{message}</p>
                    )}

                    {/* --- Botón de REGISTER --- */}
                    <button
                        type="button"
                        onClick={handleRegister}
                        disabled={isLoading}
                        className="w-full mt-6 py-3 text-xl font-bold text-white rounded-xl shadow-lg shadow-red-500/25 transition-all duration-200 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Registrando...' : 'CREAR CUENTA'}
                    </button>
                </div>
            </div>
            
            {/* Modal de éxito */}
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                message="¡Usuario registrado exitosamente!"
            />
        </LoginRegister>
    )
}