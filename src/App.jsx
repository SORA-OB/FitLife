import { Routes, Route} from 'react-router-dom'
import { Login } from "./Auth/pages/Login"
import { Register } from "./Auth/pages/Register"
import { HomePage } from './Home/pages/Home'
import { TransitionProvider } from './Auth/contexts/TransitionContext'
import { MainLayout } from './globalSources/layouts/MainLayout'
import { NotFoundPage } from './globalSources/components/PageErrorBoundary'
import { ExercisesPage } from './Exercises/pages/ExercisesPage'
import { RoutinesPage } from './Routines/pages/RoutinesPage'

function App() {

  return (
    <TransitionProvider>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<HomePage/>}/>
        
        {/* Rutas protegidas que usan el MainLayout */}
        <Route path='/exercises' element={
          <MainLayout>
            <ExercisesPage />
          </MainLayout>
        }/>
        <Route path='/routines' element={
          <MainLayout>
            <RoutinesPage />
          </MainLayout>
        }/>
        <Route path='/workouts' element={
          <MainLayout>
            <div>Página de Entrenamientos (En desarrollo)</div>
          </MainLayout>
        }/>
        <Route path='/progress' element={
          <MainLayout>
            <div>Página de Progreso (En desarrollo)</div>
          </MainLayout>
        }/>
        <Route path='/profile' element={
          <MainLayout>
            <div>Página de Perfil (En desarrollo)</div>
          </MainLayout>
        }/>
        <Route path='/settings' element={
          <MainLayout>
            <div>Página de Configuración (En desarrollo)</div>
          </MainLayout>
        }/>
        
        {/* Ruta 404 - Página no encontrada */}
        <Route path='*' element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }/>
      </Routes>
    </TransitionProvider>
  )
}

export default App
