import { Formik, Form } from 'formik'
import { useLibros } from '../context/LibroContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function LibrosForm() {
  const { createLibro, getLibro, updateLibro } = useLibros()
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
  })
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const loadLibro = async () => {
      if (params.id) {
        const libro = await getLibro(params.id)
        setLibro({
          titulo: libro.titulo,
          autor: libro.autor,
        })
      }
    }
    loadLibro()
  }, [])

  return (
    <div>
      {params.id ? 'Editar Libro' : 'Agregar Libro'}
      <Formik
        initialValues={libro}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values)
          if (params.id) {
            await updateLibro(params.id, values)
            navigate('/libros')
          } else {
            await createLibro(values)
            navigate('/libros')
          }
          setLibro({
            titulo: '',
            autor: '',
          })
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="mt-4">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="autor"
                id="autor"
                onChange={handleChange}
                value={values.autor}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={params.id ? 'Autor' : ''}
                required
              />
              <label
                htmlFor="autor"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Autor
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="titulo"
                id="titulo"
                onChange={handleChange}
                value={values.titulo}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={params.id ? 'Título' : ''}
                required
              />
              <label
                htmlFor="titulo"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Título
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LibrosForm
