import AlumnosTable from '../components/AlumnosTable'
import { useEffect } from 'react'
import axios from 'axios'
import { useAlumnos } from '../context/AlumnoContext'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function AlumnosPage() {
  const { alumnos, loadAlumnos } = useAlumnos()

  useEffect(() => {
    loadAlumnos()
  }, [])

  const updateAlumno = async (alumnoId, nuevoAlumno) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/alumnos/${alumnoId}`,
        nuevoAlumno
      )
      if (response.status === 200) {
        loadAlumnos()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAlumno = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/alumnos/${id}`
      )
      if (response.status === 200) {
        console.log(response)
        loadAlumnos()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link to="/alumno/new" className="flex items-center">
          <Plus />
          Agregar nuevo
        </Link>
        <h3>Lista de Alumnos</h3>
      </div>

      <AlumnosTable
        alumnos={alumnos}
        onUpdateAlumno={updateAlumno}
        onDeleteAlumno={deleteAlumno}
      />
    </div>
  )
}

export default AlumnosPage
