import { createContext, useContext } from 'react'
import { useState } from 'react'
import {
  getAlumnosRequest,
  deleteAlumnoRequest,
  createAlumnoRequest,
  getAlumnoRequest,
  updateAlumnoRequest,
} from '../api/alumnos'

export const AlumnoContext = createContext()

export const useAlumnos = () => {
  const context = useContext(AlumnoContext)

  if (!context) {
    throw new Error(
      'useAlumnos tiene que ser usado con un AlumnoContextProvider'
    )
  }

  return context
}

export const AlumnoContextProvider = ({ children }) => {
  const [alumnos, setAlumnos] = useState([])

  async function loadAlumnos() {
    const response = await getAlumnosRequest()
    setAlumnos(response.data)
  }

  const deleteAlumno = async (id) => {
    try {
      const response = await deleteAlumnoRequest(id)
      setAlumnos(alumnos.filter((alumno) => alumno.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const createAlumno = async (alumno) => {
    try {
      const response = await createAlumnoRequest(alumno)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getAlumno = async (id) => {
    try {
      const response = await getAlumnoRequest(id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateAlumno = async (id, newFields) => {
    try {
      const response = await updateAlumnoRequest(id, newFields)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AlumnoContext.Provider
      value={{
        alumnos,
        loadAlumnos,
        deleteAlumno,
        createAlumno,
        getAlumno,
        updateAlumno,
      }}
    >
      {children}
    </AlumnoContext.Provider>
  )
}
