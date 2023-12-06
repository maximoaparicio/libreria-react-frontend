import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function PrestamosForm() {
  const [prestamos, setPrestamos] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState([])

  const navigate = useNavigate()

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
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const handleAgregar = async () => {
    try {
      const nuevoPrestamo = {
        libroId: document.getElementById('libroSelect').value,
        alumnoId: document.getElementById('alumnoSelect').value,
        fechaEntrega: new Date().toISOString().split('T')[0],
      }

      await axios.post(
        'http://localhost:3000/api/registrar-prestamo',
        nuevoPrestamo
      )
      fetchData()
      navigate('/prestamos')
    } catch (error) {
      console.error('Error registrando prestamo:', error)
    }
  }

  return (
    <div>
      <h2>Nuevo Prestamo</h2>
      <Formik>
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col justify-center mx-auto max-w-lg"
          >
            <div>
              <label
                htmlFor="libroSelect"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Seleccionar Libro:
              </label>
              <select
                id="libroSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {libros.map((libro) => (
                  <option key={libro.id} value={libro.id}>
                    {libro.titulo}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="alumnoSelect"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Seleccionar Alumno:
              </label>
              <select
                id="alumnoSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {alumnos.map((alumno) => (
                  <option key={alumno.id} value={alumno.id}>
                    {alumno.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAgregar}
              className="mt-4 max-w-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Agregar Prestamo
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PrestamosForm
