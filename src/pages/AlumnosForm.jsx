import { Formik, Form } from 'formik'
import { useAlumnos } from '../context/AlumnoContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AlumnosForm() {
  const { createAlumno, getAlumno, updateAlumno } = useAlumnos()
  const [alumno, setAlumno] = useState({
    dni: '',
    nombre: '',
    direccion: '',
  })
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const loadAlumno = async () => {
      if (params.id) {
        const alumno = await getAlumno(params.id)
        setAlumno({
          dni: alumno.dni,
          nombre: alumno.nombre,
          direccion: alumno.direccion,
        })
      }
    }
    loadAlumno()
  }, [])

  // const schema = Yup.object().shape({
  //   dni: Yup.string().length(8, 'DNI INVALIDO').required(),
  // })

  return (
    <div>
      {params.id ? 'Editar Alumno' : 'Agregar Alumno'}
      <Formik
        initialValues={alumno}
        enableReinitialize={true}
        // validationSchema={schema}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateAlumno(params.id, values)
            navigate('/alumnos')
          } else {
            await createAlumno(values)
            navigate('/alumnos')
          }
          setAlumno({
            dni: '',
            nombre: '',
            direccion: '',
          })
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
          <Form onSubmit={handleSubmit} className="mt-4">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="dni"
                id="dni"
                onChange={handleChange}
                value={values.dni}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={params.id ? 'DNI' : ''}
                required
              />
              <label
                htmlFor="dni"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                DNI
              </label>
              {/* {errors.dni && <span className="text-red-300">dni invalido</span>} */}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="nombre"
                id="nombre"
                onChange={handleChange}
                value={values.nombre}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={params.id ? 'Nombre' : ''}
                required
              />
              <label
                htmlFor="nombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="direccion"
                id="direccion"
                onChange={handleChange}
                value={values.direccion}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={params.id ? 'Dirección' : ''}
                required
              />
              <label
                htmlFor="direccion"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Dirección
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

export default AlumnosForm
