import { Routes, Route} from 'react-router-dom'
import { Login } from "./Auth/ui/pages/Login"
import { Register } from "./Auth/ui/pages/Register"
import { HomePage } from './Home/ui/pages/Home'
import { TransitionProvider } from './Auth/ui/contexts/TransitionContext'

function App() {

  return (
    <TransitionProvider>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </TransitionProvider>
  )
}

export default App
