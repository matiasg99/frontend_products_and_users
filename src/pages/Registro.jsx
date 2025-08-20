import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { nombre, email, password });
      navigate("/inicio-sesion", { replace: true });
    } catch (err) {
      setMsg(err?.response?.data?.error || "Error de registro");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 420 }}>
      <h3>Registro</h3>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="form-control mb-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Crear cuenta</button>
      </form>
      <div className="mt-3">
        <small>¿Ya tenés cuenta? <Link to="/inicio-sesion">Iniciá sesión</Link></small>
      </div>
    </div>
  );
}
