import PrestamosTable from '../components/PrestamosTable'
import { useEffect } from 'react'
import axios from 'axios'
import { usePrestamos } from '../context/PrestamoContext'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

function PrestamosPage() {
  const { prestamos, loadPrestamos } = usePrestamos()

  useEffect(() => {
    loadPrestamos()
  }, [])

  const updatePrestamo = async (prestamoId, nuevoPrestamo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/prestamos/${prestamoId}`,
        nuevoPrestamo
      )
      if (response.status === 200) {
        loadPrestamos()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePrestamo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/prestamos/${id}`
      )
      if (response.status === 200) {
        console.log(response)
        loadPrestamos()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link to="/prestamo/new" className="flex items-center">
          <Plus />
          Agregar nuevo
        </Link>
        <h3>Lista de Prestamos</h3>
      </div>
      <PrestamosTable
        prestamos={prestamos}
        onUpdatePrestamo={updatePrestamo}
        onDeletePrestamo={deletePrestamo}
      />
    </div>
  )
}

export default PrestamosPage
