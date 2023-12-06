import axios from 'axios'

export const getLibrosRequest = async () =>
  await axios.get('http://localhost:3000/api/libros')

export const createLibroRequest = async (libro) =>
  await axios.post('http://localhost:3000/api/libros', libro)

export const deleteLibroRequest = async (id) =>
  await axios.delete(`http://localhost:3000/api/libros/${id}`)

export const getLibroRequest = async (id) =>
  await axios.get(`http://localhost:3000/api/libros/${id}`)

export const updateLibroRequest = async (id, newFields) =>
  await axios.patch(`http://localhost:3000/api/libros/${id}`, newFields)
