import LibrosTable from '../components/LibrosTable'
import { useEffect } from 'react'
import axios from 'axios'
import { useLibros } from '../context/LibroContext'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

function LibrosPage() {
  const { libros, loadLibros } = useLibros()

  useEffect(() => {
    loadLibros()
  }, [])

  const updateLibro = async (libroId, nuevoLibro) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/libros/${libroId}`,
        nuevoLibro
      )
      if (response.status === 200) {
        loadLibros()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteLibro = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/libros/${id}`
      )
      if (response.status === 200) {
        console.log(response)
        loadLibros()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link to="/libro/new" className="flex items-center">
          <Plus />
          Agregar nuevo
        </Link>
        <h3>Lista de Libros</h3>
      </div>
      <LibrosTable
        libros={libros}
        onUpdateLibro={updateLibro}
        onDeleteLibro={deleteLibro}
      />
    </div>
  )
}

export default LibrosPage
