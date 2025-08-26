import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./routes/guards";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ProductosCRUD from "./components/ProductosCRUD";
import UsuariosCRUD from "./components/UsuariosCRUD";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ minHeight: '100vh', background: '#f4f6fa' }}>
        <h1 style={{
          textAlign: 'center',
          margin: '2rem 0 1.5rem 0',
          fontWeight: 700,
          color: '#0d6efd',
          letterSpacing: '1px',
          textShadow: '0 2px 8px #cfe2ff',
        }}>
          Gestión de Productos y Personas
        </h1>

        <Navbar />

        <Routes>
          <Route
            path="/inicio-sesion"
            element={<PublicRoute><Login /></PublicRoute>}
          />
          <Route
            path="/registro"
            element={<PublicRoute><Registro /></PublicRoute>}
          />
          <Route
            path="/productos"
            element={<PrivateRoute><ProductosCRUD /></PrivateRoute>}
          />
          <Route
            path="/usuarios"
            element={<PrivateRoute><UsuariosCRUD /></PrivateRoute>}
          />
          {/* Home: si hay sesión, mandá a /productos; si no, a /inicio-sesion */}
          <Route
            path="/"
            element={<PublicOrPrivateHome />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function PublicOrPrivateHome() {
  const { token, loading } = useAuth();
  if (loading) return null;
  return token ? <Navigate to="/productos" replace /> : <Navigate to="/inicio-sesion" replace />;
}
