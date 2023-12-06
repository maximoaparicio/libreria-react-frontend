import { createContext, useContext } from 'react'
import { useState } from 'react'
import {
  getLibrosRequest,
  deleteLibroRequest,
  createLibroRequest,
  getLibroRequest,
  updateLibroRequest,
} from '../api/libros'

export const LibroContext = createContext()

export const useLibros = () => {
  const context = useContext(LibroContext)

  if (!context) {
    throw new Error('useLibros tiene que ser usado con un LibroContextProvider')
  }

  return context
}

export const LibroContextProvider = ({ children }) => {
  const [libros, setLibros] = useState([])

  async function loadLibros() {
    const response = await getLibrosRequest()
    setLibros(response.data)
  }

  const deleteLibro = async (id) => {
    try {
      const response = await deleteLibroRequest(id)
      setLibros(libros.filter((libro) => libro.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const createLibro = async (libro) => {
    try {
      const response = await createLibroRequest(libro)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const getLibro = async (id) => {
    try {
      const response = await getLibroRequest(id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateLibro = async (id, newFields) => {
    try {
      const response = await updateLibroRequest(id, newFields)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LibroContext.Provider
      value={{
        libros,
        loadLibros,
        deleteLibro,
        createLibro,
        getLibro,
        updateLibro,
      }}
    >
      {children}
    </LibroContext.Provider>
  )
}
