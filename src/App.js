import React, { useState } from 'react';
import Tabs from './components/Tabs';
import ProductosCRUD from './components/ProductosCRUD';
import UsuariosCRUD from './components/UsuariosCRUD';

function App() {
  const [activeTab, setActiveTab] = useState('productos');

  return (
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
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'productos' ? <ProductosCRUD /> : <UsuariosCRUD />}
    </div>
  );
}

export default App;