import { Routes, Route } from 'react-router-dom'

import AlumnosPage from './pages/AlumnosPage'
import AlumnosForm from './pages/AlumnosForm'
import LibrosPage from './pages/LibrosPage'
import LibrosForm from './pages/LibrosForm'
import PrestamosPage from './pages/PrestamosPage'
import PrestamosForm from './pages/PrestamosForm'

import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'

import { AlumnoContextProvider } from './context/AlumnoContext'
import { LibroContextProvider } from './context/LibroContext'
import { PrestamoContextProvider } from './context/PrestamoContext'
import PrestamosWithDetails from './pages/PrestamosWithDetails'

function App() {
  return (
    <div className="h-screen bg-slate-700 text-slate-300">
      <main className="max-w-[1200px] mx-auto p-4">
        <Navbar />
        <PrestamoContextProvider>
          <AlumnoContextProvider>
            <LibroContextProvider>
              <Routes>
                <Route path="/" element={<PrestamosWithDetails />} />
                <Route path="/alumnos" element={<AlumnosPage />} />
                <Route path="/alumno/new" element={<AlumnosForm />} />
                <Route path="/alumno/edit/:id" element={<AlumnosForm />} />
                <Route path="/libros" element={<LibrosPage />} />
                <Route path="/libro/new" element={<LibrosForm />} />
                <Route path="/libro/edit/:id" element={<LibrosForm />} />
                <Route path="/prestamos" element={<PrestamosPage />} />
                <Route path="/prestamo/new" element={<PrestamosForm />} />
                <Route path="/prestamo/edit/:id" element={<PrestamosForm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LibroContextProvider>
          </AlumnoContextProvider>
        </PrestamoContextProvider>
      </main>
    </div>
  )
}

export default App
