import { createContext, useContext } from 'react'
import { useState } from 'react'
import {
  getPrestamosRequest,
  deletePrestamoRequest,
  createPrestamoRequest,
} from '../api/prestamos'

export const PrestamoContext = createContext()

export const usePrestamos = () => {
  const context = useContext(PrestamoContext)

  if (!context) {
    throw new Error(
      'usePrestamos tiene que ser usado con un PrestamoContextProvider'
    )
  }

  return context
}

export const PrestamoContextProvider = ({ children }) => {
  const [prestamos, setPrestamos] = useState([])

  async function loadPrestamos() {
    const response = await getPrestamosRequest()
    setPrestamos(response.data)
  }

  const deletePrestamo = async (id) => {
    try {
      const response = await deletePrestamoRequest(id)
      setPrestamos(prestamos.filter((prestamo) => prestamo.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const createPrestamo = async (prestamo) => {
    try {
      const response = await createPrestamoRequest(prestamo)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const getPrestamo = async (id) => {
    try {
      const response = await getPrestamoRequest(id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const updatePrestamo = async (id, newFields) => {
    try {
      const response = await updatePrestamoRequest(id, newFields)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PrestamoContext.Provider
      value={{
        prestamos,
        loadPrestamos,
        deletePrestamo,
        createPrestamo,
        getPrestamo,
        updatePrestamo,
      }}
    >
      {children}
    </PrestamoContext.Provider>
  )
}
