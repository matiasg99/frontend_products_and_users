import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

function ProductosCRUD() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });
  const [editando, setEditando] = useState(null);
  const [editProducto, setEditProducto] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const res = await axios.get('/api/productos');
    setProductos(res.data);
  };

  const crearProducto = async (e) => {
    e.preventDefault();
    await axios.post('/api/productos', nuevoProducto);
    setNuevoProducto({ nombre: '', precio: '' });
    obtenerProductos();
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`/api/productos/${id}`);
    obtenerProductos();
  };

  const iniciarEdicion = (producto) => {
    setEditando(producto.id);
    setEditProducto({ nombre: producto.nombre, precio: producto.precio });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    await axios.put(`/api/productos/${editando}`, editProducto);
    setEditando(null);
    obtenerProductos();
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Listado de Productos', 14, 10);
    autoTable(doc, {
      head: [['Nombre', 'Precio']],
      body: productos.map(p => [p.nombre, `$${p.precio}`]),
    });
    doc.save('productos.pdf');
  };

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col><h2>Productos</h2></Col>
        <Col className="text-end">
          <Button variant="success" onClick={exportarPDF}>Exportar PDF</Button>
        </Col>
      </Row>
      <Form onSubmit={crearProducto} className="mb-3">
        <Row>
          <Col>
            <Form.Control
              placeholder="Nombre"
              value={nuevoProducto.nombre}
              onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Precio"
              type="number"
              value={nuevoProducto.precio}
              onChange={e => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
              required
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary">Agregar</Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>
                {editando === producto.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      value={editProducto.nombre}
                      onChange={e => setEditProducto({ ...editProducto, nombre: e.target.value })}
                      required
                    />
                  </Form>
                ) : (
                  producto.nombre
                )}
              </td>
              <td>
                {editando === producto.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      type="number"
                      value={editProducto.precio}
                      onChange={e => setEditProducto({ ...editProducto, precio: e.target.value })}
                      required
                    />
                  </Form>
                ) : (
                  `$${producto.precio}`
                )}
              </td>
              <td>
                {editando === producto.id ? (
                  <>
                    <Button size="sm" variant="success" onClick={guardarEdicion}>Guardar</Button>{' '}
                    <Button size="sm" variant="secondary" onClick={() => setEditando(null)}>Cancelar</Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="warning" onClick={() => iniciarEdicion(producto)}>Editar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductosCRUD;