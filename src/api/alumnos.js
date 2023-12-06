import axios from 'axios'

export const getAlumnosRequest = async () =>
  await axios.get('http://localhost:3000/api/alumnos')

export const createAlumnoRequest = async (alumno) =>
  await axios.post('http://localhost:3000/api/alumnos', alumno)

export const deleteAlumnoRequest = async (id) =>
  await axios.delete(`http://localhost:3000/api/alumnos/${id}`)

export const getAlumnoRequest = async (id) =>
  await axios.get(`http://localhost:3000/api/alumnos/${id}`)

export const updateAlumnoRequest = async (id, newFields) =>
  await axios.patch(`http://localhost:3000/api/alumnos/${id}`, newFields)
