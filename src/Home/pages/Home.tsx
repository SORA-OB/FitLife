import { MainLayout } from "../../globalSources/layouts/MainLayout"

export const HomePage = () => {
    return(
        <MainLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Dashboard - FitLife
                    </h1>
                    <p className="text-gray-600">
                        ¡Bienvenido a tu panel de control de FitLife! 
                        Aquí podrás monitorear tu progreso y gestionar tus entrenamientos.
                    </p>
                </div>

                {/* Métricas rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Entrenamientos esta semana</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">5</p>
                        <p className="text-sm text-green-600 mt-1">+2 más que la semana pasada</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Calorías quemadas</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">1,247</p>
                        <p className="text-sm text-green-600 mt-1">+15% esta semana</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Objetivos completados</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-2">3/5</p>
                        <p className="text-sm text-blue-600 mt-1">60% completado</p>
                    </div>
                </div>

                {/* Área para contenido adicional */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Actividad Reciente
                    </h2>
                    <p className="text-gray-600">
                        Aquí se mostrarán tus entrenamientos y actividades más recientes.
                    </p>
                </div>
            </div>
        </MainLayout>
    )
}