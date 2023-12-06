import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 p-4 rounded-sm">
      <h1 className="text-xl font-bold hover:text-slate-100">
        <Link to="/">Libreria Dip</Link>
      </h1>
      <ul className="flex gap-6">
        <li className="hover:text-slate-100">
          <Link to="/alumnos">Alumnos</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link to="/libros">Libros</Link>
        </li>
        <li className="hover:text-slate-100">
          <Link to="/prestamos">Prestamos</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
