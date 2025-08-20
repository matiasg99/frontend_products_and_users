import React, { useState, useEffect } from "react";
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function ProductosCRUD() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "", stock: "" });
  const [editando, setEditando] = useState(null);
  const [editProducto, setEditProducto] = useState({ nombre: "", precio: "", stock: "" });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    obtenerProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const obtenerProductos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/productos");
      setProductos(res.data || []);
    } catch (err) {
      setMsg(err?.response?.data?.error || "Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      await api.post("/productos", {
        nombre: String(nuevoProducto.nombre).trim(),
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock || 0),
      });
      setNuevoProducto({ nombre: "", precio: "", stock: "" });
      await obtenerProductos();
    } catch (err) {
      alert(err?.response?.data?.error || "Error al crear producto (¿tenés rol admin?)");
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/productos/${id}`);
      await obtenerProductos();
    } catch (err) {
      alert(err?.response?.data?.error || "Error al eliminar (¿tenés rol admin?)");
    }
  };

  const iniciarEdicion = (p) => {
    setEditando(p.id);
    setEditProducto({ nombre: p.nombre, precio: p.precio, stock: p.stock ?? 0 });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/productos/${editando}`, {
        nombre: String(editProducto.nombre).trim(),
        precio: Number(editProducto.precio),
        stock: Number(editProducto.stock || 0),
      });
      setEditando(null);
      await obtenerProductos();
    } catch (err) {
      alert(err?.response?.data?.error || "Error al actualizar (¿tenés rol admin?)");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Productos", 14, 10);
    autoTable(doc, {
      head: [["Nombre", "Precio", "Stock"]],
      body: productos.map((p) => [p.nombre, `$${p.precio}`, p.stock ?? 0]),
    });
    doc.save("productos.pdf");
  };

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col><h2>Productos</h2></Col>
        <Col className="text-end">
          <Button variant="success" onClick={exportarPDF}>Exportar PDF</Button>
        </Col>
      </Row>

      {msg && <div className="alert alert-danger">{msg}</div>}
      {loading && <div className="alert alert-info">Cargando…</div>}

      {/* Form de alta SOLO visible para admin */}
      {isAdmin && (
        <Form onSubmit={crearProducto} className="mb-3">
          <Row className="g-2">
            <Col md>
              <Form.Control
                placeholder="Nombre"
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                required
              />
            </Col>
            <Col md>
              <Form.Control
                placeholder="Precio"
                type="number"
                value={nuevoProducto.precio}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                required
              />
            </Col>
            <Col md>
              <Form.Control
                placeholder="Stock"
                type="number"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" variant="primary">Agregar</Button>
            </Col>
          </Row>
        </Form>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th style={{width: 140}}>Precio</th>
            <th style={{width: 120}}>Stock</th>
            <th style={{width: 200}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                {editando === p.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      value={editProducto.nombre}
                      onChange={(e) => setEditProducto({ ...editProducto, nombre: e.target.value })}
                      required
                    />
                  </Form>
                ) : (
                  p.nombre
                )}
              </td>
              <td>
                {editando === p.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      type="number"
                      value={editProducto.precio}
                      onChange={(e) => setEditProducto({ ...editProducto, precio: e.target.value })}
                      required
                    />
                  </Form>
                ) : (
                  `$${p.precio}`
                )}
              </td>
              <td>
                {editando === p.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      type="number"
                      value={editProducto.stock}
                      onChange={(e) => setEditProducto({ ...editProducto, stock: e.target.value })}
                    />
                  </Form>
                ) : (
                  p.stock ?? 0
                )}
              </td>
              <td>
                {editando === p.id ? (
                  <>
                    <Button size="sm" variant="success" onClick={guardarEdicion}>Guardar</Button>{" "}
                    <Button size="sm" variant="secondary" onClick={() => setEditando(null)}>Cancelar</Button>
                  </>
                ) : (
                  <>
                    {/* Botones solo admin; para no-admin, se ocultan */}
                    {isAdmin && (
                      <>
                        <Button size="sm" variant="warning" onClick={() => iniciarEdicion(p)}>Editar</Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => eliminarProducto(p.id)}>Eliminar</Button>
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr><td colSpan={4} className="text-center text-muted">Sin productos</td></tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductosCRUD;
