import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login({ token: data.token, user: data.user });
      navigate("/", { replace: true });
    } catch (err) {
      setMsg(err?.response?.data?.error || "Error de login");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 420 }}>
      <h3>Inicio de sesión</h3>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="form-control mb-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Ingresar</button>
      </form>
      <div className="mt-3">
        <small>¿No tenés cuenta? <Link to="/registro">Registrate</Link></small>
      </div>
    </div>
  );
}
