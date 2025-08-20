import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSuccess }) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login({ token: data.token, user: data.user });
      onSuccess();
    } catch (err) {
      alert(err?.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Ingresar</button>
    </form>
  );
}
