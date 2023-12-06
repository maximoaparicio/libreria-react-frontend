import { useState, useEffect } from 'react'
import axios from 'axios'

const PrestamosTable = () => {
  const [prestamos, setPrestamos] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [prestamosResponse, alumnosResponse, librosResponse] =
        await Promise.all([
          axios.get('http://localhost:3000/api/prestamos'),
          axios.get('http://localhost:3000/api/alumnos'),
          axios.get('http://localhost:3000/api/libros'),
        ])

      setPrestamos(prestamosResponse.data)
      setAlumnos(alumnosResponse.data)
      setLibros(librosResponse.data)
      setLoading(false)
      console.log(prestamos)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const handleDevolucion = async (prestamoId) => {
    try {
      await axios.post('http://localhost:3000/api/registrar-devolucion', {
        prestamoId,
        fechaDevolucion: new Date().toISOString().split('T')[0],
      })
      fetchData()
    } catch (error) {
      console.error('Error registering devolucion:', error)
    }
  }

  const handleEliminar = async (prestamoId, libroDevuelto) => {
    try {
      if (!libroDevuelto) {
        alert('No puedes eliminar un libro si no ha sido devuelto')
      } else {
        await axios.delete(`http://localhost:3000/api/prestamo/${prestamoId}`)
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting prestamo:', error)
    }
  }

  return (
    <div className="relative overflow-x-auto overflow-y-auto max-h-[80vh]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Libro
            </th>
            <th scope="col" className="px-6 py-3">
              Alumno
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Entrega
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Devolución
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo) => (
            <tr
              key={prestamo.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 text-white">{prestamo.libro}</td>
              <td className="px-6 py-4 text-white">{prestamo.alumno}</td>
              <td className="px-6 py-4 text-white">
                {prestamo.fechaEntregaFormatted}
              </td>
              <td className="px-6 py-4 text-white">
                {prestamo.fechaDevolucion
                  ? new Date(prestamo.fechaDevolucion).toLocaleDateString()
                  : 'No devuelto'}
              </td>
              <td className="px-6 py-4 flex">
                {!prestamo.fechaDevolucion && (
                  <button
                    onClick={() => handleDevolucion(prestamo.id)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Devolver
                  </button>
                )}
                <button
                  onClick={() =>
                    handleEliminar(prestamo.id, !!prestamo.fechaDevolucion)
                  }
                  disabled={!prestamo.fechaDevolucion}
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrestamosTable
