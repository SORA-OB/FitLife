import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FiHome,
    FiActivity,
    FiTrendingUp,
    FiCalendar,
    FiUser,
    FiSettings,
    FiLogOut,
    FiTarget,
    FiBarChart,
    FiHeart,
    FiCoffee
} from 'react-icons/fi';
import { FaDumbbell } from 'react-icons/fa6';

interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    path: string;
    badge?: number;
    description?: string;
}

interface SidebarItemProps {
    item: NavItem;
    isActive: boolean;
    onHover: (id: string | null) => void;
    hoveredItem: string | null;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    item,
    isActive,
    onHover,
    hoveredItem
}) => {
    const IconComponent = item.icon;

    return (
        <li
            onMouseEnter={() => onHover(item.id)}
            onMouseLeave={() => onHover(null)}
            className="relative"
        >
            <Link
                to={item.path}
                className={`
                    group flex items-center h-12 px-4 rounded-xl font-medium
                    transition-all duration-300 ease-in-out relative
                    ${isActive
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                    }
                `}
            >
                <div className={`
                    flex items-center justify-center mr-3 transition-all duration-200
                    ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-red-500'}
                `}>
                    <IconComponent
                        size={20}
                        className="transition-transform duration-200 group-hover:scale-110"
                    />
                </div>

                {/* Label */}
                <span className="flex-1 whitespace-nowrap">
                    {item.label}
                </span>

                {/* Badge de notificaciones */}
                {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {item.badge}
                    </span>
                )}

                {/* Indicador de página activa */}
                {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                )}

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </Link>
        </li>
    );
};

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Elementos de navegación principales
    const mainNavItems: NavItem[] = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: FiHome,
            path: '/home',
            description: 'Panel principal con resumen de actividades'
        },
        {
            id: 'routines',
            label: 'Rutinas',
            icon: FiActivity,
            path: '/routines',
            /*badge: 3,*/
            description: 'Gestiona tus rutinas de ejercicios'
        },
        {
            id: 'exercises',
            label: 'Ejercicios',
            icon: FaDumbbell,
            path: '/exercises',
            description: 'Gestiona ejercicios de manera personalizada'
        },
        {
            id: 'schedule',
            label: 'Agenda',
            icon: FiCalendar,
            path: '/schedule',
            description: 'Planifica y organiza tus sesiones de entrenamiento'
        },
        {
            id: 'nutrition',
            label: 'Nutrición',
            icon: FiCoffee,
            path: '/nutrition',
            description: 'Gestiona tu alimentación y planes nutricionales'
        },
        /** 
        {
            id: 'progress',
            label: 'Progreso',
            icon: FiTrendingUp,
            path: '/progress',
            description: 'Seguimiento de tu evolución fitness'
        },
        {
            id: 'nutrition',
            label: 'Nutrición',
            icon: FiHeart,
            path: '/nutrition',
            description: 'Control de dieta y alimentación'
        },
        
        {
            id: 'goals',
            label: 'Objetivos',
            icon: FiTarget,
            path: '/goals',
            description: 'Establece y monitorea tus metas'
        }*/
    ];

    // Elementos de configuración
    const configItems: NavItem[] = [
        {
            id: 'profile',
            label: 'Perfil',
            icon: FiUser,
            path: '/profile',
            description: 'Información personal y configuración'
        },
        {
            id: 'settings',
            label: 'Configuración',
            icon: FiSettings,
            path: '/settings',
            description: 'Ajustes de la aplicación'
        }
    ];

    const handleLogout = () => {
        // lógica del logout (Pendiente)
        navigate('/');
    };

    const isActiveRoute = (path: string) => {
        return location.pathname === path;
    };

    return (
        <aside className="w-64 h-full bg-white shadow-xl border-r border-gray-200 flex flex-col">
            {/* Header del sidebar */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">FL</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">FitLife</h1>
                        <p className="text-sm text-gray-500">Tu compañero fitness</p>
                    </div>
                </div>
            </div>

            {/* Navegación principal */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide">
                <div className="space-y-2">
                    {/* Label de sección */}
                    <div className="px-3 mb-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Principal
                        </p>
                    </div>

                    {/* Sección principal */}
                    <div className="space-y-1">
                        {mainNavItems.map((item) => (
                            <SidebarItem
                                key={item.id}
                                item={item}
                                isActive={isActiveRoute(item.path)}
                                onHover={setHoveredItem}
                                hoveredItem={hoveredItem}
                            />
                        ))}
                    </div>
                    {/** /}
                    {/* Separador */}
                    
                    
                </div>
            </nav>

            {/* Footer con botón de logout */}
            {/**
            <div className="border-t border-gray-200 p-4">
                <button
                    onClick={handleLogout}
                    onMouseEnter={() => setHoveredItem('logout')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                        group flex items-center w-full h-12 px-4 rounded-xl font-medium
                        text-gray-700 hover:bg-red-50 hover:text-red-600 
                        transition-all duration-200 relative overflow-hidden
                    `}
                >
                    <div className="flex items-center justify-center mr-3 text-gray-500 group-hover:text-red-500 transition-colors duration-200">
                        <FiLogOut
                            size={20}
                            className="transition-transform duration-200 group-hover:scale-110"
                        />
                    </div>

                    <span className="flex-1 whitespace-nowrap">
                        Cerrar Sesión
                    </span>
                </button>
            </div>/
             */}
        </aside>
    );
};

// Hook para compatibilidad con MainLayout
export const useSidebar = () => {
    return {
        isOpen: true, // Siempre abierto
    };
};
