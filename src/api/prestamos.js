import axios from 'axios'

export const getPrestamosRequest = async () =>
  await axios.get('http://localhost:3000/api/prestamos')

export const createPrestamoRequest = async (prestamo) =>
  await axios.post('http://localhost:3000/api/prestamos', prestamo)

export const deletePrestamoRequest = async (id) =>
  await axios.delete(`http://localhost:3000/api/prestamo/${id}`)
