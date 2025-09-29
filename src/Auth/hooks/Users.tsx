import { useState, useCallback } from "react";

// Tipos para mejor organización
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface LoginResult {
    success: boolean;
    user?: User;
    message: string;
}

// Hook personalizado para manejo de usuarios
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Arturo', email: 'example@gmail.com', password: '123' },
        { id: 2, name: 'María', email: 'maria@gmail.com', password: 'pass123' },
        { id: 3, name: 'Juan', email: 'juan@example.com', password: 'mypass' }
    ]);

    const [isLoading, setIsLoading] = useState(false);

    // Función para simular validación de login
    const validateLogin = useCallback(async (email: string, password: string): Promise<LoginResult> => {
        setIsLoading(true);
        
        // Simular delay de BD (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundUser = users.find(user => 
            user.email.toLowerCase() === email.toLowerCase() && 
            user.password === password
        );

        setIsLoading(false);

        if (foundUser) {
            return {
                success: true,
                user: foundUser,
                message: `Bienvenido, ${foundUser.name}!`
            };
        } else {
            return {
                success: false,
                message: 'Email o contraseña incorrectos'
            };
        }
    }, [users]);

    // Función para registrar nuevo usuario
    const registerUser = useCallback((name: string, email: string, password: string): LoginResult => {
        const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
        
        if (existingUser) {
            return {
                success: false,
                message: 'Este email ya está registrado'
            };
        }

        const newUser: User = {
            id: users.length + 1,
            name,
            email,
            password
        };

        setUsers(prev => [...prev, newUser]);

        return {
            success: true,
            user: newUser,
            message: `Usuario ${name} registrado exitosamente!`
        };
    }, [users]);

    return {
        users,
        isLoading,
        validateLogin,
        registerUser
    };
};