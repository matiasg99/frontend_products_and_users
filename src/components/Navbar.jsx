import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.rol === "admin";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3">
      <Link className="navbar-brand" to="/">Inicio</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {!user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/inicio-sesion">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/registro">Registro</Link></li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/usuarios">Usuarios</Link></li>
              {isAdmin && (
                <li className="nav-item"><Link className="nav-link" to="/usuarios">Panel Admin</Link></li>
              )}
            </>
          )}
        </ul>
        {user && (
          <div className="d-flex align-items-center gap-3">
            <span>{user.nombre} <span className="badge bg-secondary">{user.rol}</span></span>
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
