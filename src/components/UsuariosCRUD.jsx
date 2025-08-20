import React, { useState, useEffect } from "react";
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const ROLES = ["admin", "moderador", "cliente"];

function UsuariosCRUD() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [editById, setEditById] = useState({});
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      const res = await api.get("/usuarios");
      // backend devuelve [{id, nombre, email, rol}]
      const rows = (res.data || []).map((u) => ({ ...u }));
      setUsuarios(rows);
      setEditById(Object.fromEntries(rows.map(u => [u.id, { rol: u.rol }])));
    } catch (err) {
      setMsg(err?.response?.data?.error || "Error al obtener usuarios (¿sos admin?)");
    } finally {
      setLoading(false);
    }
  };

  const setRolLocal = (id, rol) => {
    setEditById((prev) => ({ ...prev, [id]: { ...prev[id], rol } }));
  };

  const guardarRol = async (id) => {
    if (!isAdmin) return;
    try {
      const rol = editById[id]?.rol;
      await api.put(`/usuarios/${id}/rol`, { rol });
      // reflejar en tabla
      setUsuarios((prev) => prev.map(u => u.id === id ? { ...u, rol } : u));
    } catch (err) {
      alert(err?.response?.data?.error || "No se pudo cambiar el rol");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Usuarios", 14, 10);
    autoTable(doc, {
      head: [["ID", "Nombre", "Email", "Rol"]],
      body: usuarios.map((u) => [u.id, u.nombre, u.email, u.rol]),
    });
    doc.save("usuarios.pdf");
  };

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col><h2>Usuarios (Panel Admin)</h2></Col>
        <Col className="text-end">
          <Button variant="success" onClick={exportarPDF}>Exportar PDF</Button>
        </Col>
      </Row>

      {msg && <div className="alert alert-danger">{msg}</div>}
      {loading && <div className="alert alert-info">Cargando…</div>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{width: 80}}>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th style={{width: 180}}>Rol</th>
            <th style={{width: 160}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <Form.Select
                  size="sm"
                  value={editById[u.id]?.rol ?? u.rol}
                  onChange={(e) => setRolLocal(u.id, e.target.value)}
                  disabled={!isAdmin}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => guardarRol(u.id)}
                  disabled={!isAdmin}
                >
                  Guardar
                </Button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr><td colSpan={5} className="text-center text-muted">Sin usuarios</td></tr>
          )}
        </tbody>
      </Table>
      {!isAdmin && (
        <div className="alert alert-warning mt-3">
          No tenés permisos de administrador para editar roles.
        </div>
      )}
    </div>
  );
}

export default UsuariosCRUD;
