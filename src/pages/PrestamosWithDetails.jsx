import { useState, useEffect } from 'react'
import axios from 'axios'

function PrestamosWithDetails() {
  const [prestamosDetails, setPrestamosDetails] = useState([])

  useEffect(() => {
    loadPrestamosWithDetails()
  }, [])

  const loadPrestamosWithDetails = async () => {
    const response = await axios.get(
      'http://localhost:3000/api/prestamos-with-details'
    )
    setPrestamosDetails(response.data)
  }

  return (
    <div className="relative overflow-x-auto overflow-y-auto max-h-[80vh] mt-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Libro
            </th>
            <th scope="col" className="px-6 py-3">
              Autor
            </th>
            <th scope="col" className="px-6 py-3">
              Alumno
            </th>
            <th scope="col" className="px-6 py-3">
              DNI
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Entrega
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Devolución
            </th>
          </tr>
        </thead>
        <tbody>
          {prestamosDetails.map((prestamo) => (
            <tr
              key={prestamo.prestamoId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 text-white">{prestamo.libroTitulo}</td>
              <td className="px-6 py-4 text-white">{prestamo.libroAutor}</td>
              <td className="px-6 py-4 text-white">{prestamo.alumnoNombre}</td>
              <td className="px-6 py-4 text-white">{prestamo.alumnoDni}</td>
              <td className="px-6 py-4 text-white">
                {prestamo.fechaEntregaFormatted}
              </td>
              <td className="px-6 py-4 text-white">
                {prestamo.fechaDevolucion
                  ? new Date(prestamo.fechaDevolucion).toLocaleDateString()
                  : 'No devuelto'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrestamosWithDetails
