import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Row, Col } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

function UsuariosCRUD() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', edad: '' });
  const [editando, setEditando] = useState(null);
  const [editUsuario, setEditUsuario] = useState({ nombre: '', email: '', edad: '' });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const res = await axios.get('/api/usuarios');
    setUsuarios(res.data);
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    await axios.post('/api/usuarios', nuevoUsuario);
    setNuevoUsuario({ nombre: '', email: '', edad: '' });
    obtenerUsuarios();
  };

  const eliminarUsuario = async (id) => {
    await axios.delete(`/api/usuarios/${id}`);
    obtenerUsuarios();
  };

  const iniciarEdicion = (usuario) => {
    setEditando(usuario.id);
    setEditUsuario({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    await axios.put(`/api/usuarios/${editando}`, editUsuario);
    setEditando(null);
    obtenerUsuarios();
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Listado de Personas', 14, 10);
    autoTable(doc, {
      head: [['Nombre', 'Email', 'Edad']],
      body: usuarios.map(u => [u.nombre, u.email, u.edad]),
    });
    doc.save('personas.pdf');
  };

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <Col><h2>Personas</h2></Col>
        <Col className="text-end">
          <Button variant="success" onClick={exportarPDF}>Exportar PDF</Button>
        </Col>
      </Row>
      <Form onSubmit={crearUsuario} className="mb-3">
        <Row>
          <Col>
            <Form.Control
              placeholder="Nombre"
              value={nuevoUsuario.nombre}
              onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Email"
              type="email"
              value={nuevoUsuario.email}
              onChange={e => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Edad"
              type="number"
              value={nuevoUsuario.edad}
              onChange={e => setNuevoUsuario({ ...nuevoUsuario, edad: e.target.value })}
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
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>
                {editando === usuario.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      value={editUsuario.nombre}
                      onChange={e => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
                      required
                    />
                  </Form>
                ) : (
                  usuario.nombre
                )}
              </td>
              <td>
                {editando === usuario.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      type="email"
                      value={editUsuario.email}
                      onChange={e => setEditUsuario({ ...editUsuario, email: e.target.value })}
                      required
                    />
                  </Form>
                ) : (
                  usuario.email
                )}
              </td>
              <td>
                {editando === usuario.id ? (
                  <Form onSubmit={guardarEdicion} className="d-flex gap-2">
                    <Form.Control
                      type="number"
                      value={editUsuario.edad}
                      onChange={e => setEditUsuario({ ...editUsuario, edad: e.target.value })}
                      required
                    />
                  </Form>
                ) : (
                  usuario.edad
                )}
              </td>
              <td>
                {editando === usuario.id ? (
                  <>
                    <Button size="sm" variant="success" onClick={guardarEdicion}>Guardar</Button>{' '}
                    <Button size="sm" variant="secondary" onClick={() => setEditando(null)}>Cancelar</Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="warning" onClick={() => iniciarEdicion(usuario)}>Editar</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</Button>
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

export default UsuariosCRUD;