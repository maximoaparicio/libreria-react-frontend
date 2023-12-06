import { useLibros } from '../context/LibroContext'
import { useNavigate } from 'react-router-dom'

const LibrosTable = ({ libros }) => {
  const { deleteLibro } = useLibros()
  const navigate = useNavigate()

  return (
    <div className="relative overflow-x-auto overflow-y-auto max-h-[80vh]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Autor
            </th>
            <th scope="col" className="px-6 py-3">
              Título
            </th>
            <th scope="col" className="px-6 py-3p">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr
              key={libro.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4 text-white">{libro.autor}</td>
              <td className="px-6 py-4 text-white">{libro.titulo}</td>
              <td className="px-6 py-4 flex">
                <button
                  onClick={() => navigate(`/libro/edit/${libro.id}`)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteLibro(libro.id)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LibrosTable
