import React from 'react';

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
      <button
        onClick={() => setActiveTab('productos')}
        style={{
          fontWeight: activeTab === 'productos' ? 'bold' : 'normal',
          background: activeTab === 'productos' ? '#0d6efd' : '#f8f9fa',
          color: activeTab === 'productos' ? '#fff' : '#0d6efd',
          border: '1px solid #0d6efd',
          borderRadius: '20px',
          padding: '0.5rem 1.5rem',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
      >
        Productos
      </button>
      <button
        onClick={() => setActiveTab('usuarios')}
        style={{
          fontWeight: activeTab === 'usuarios' ? 'bold' : 'normal',
          background: activeTab === 'usuarios' ? '#0d6efd' : '#f8f9fa',
          color: activeTab === 'usuarios' ? '#fff' : '#0d6efd',
          border: '1px solid #0d6efd',
          borderRadius: '20px',
          padding: '0.5rem 1.5rem',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
      >
        Personas
      </button>
    </div>
  );
}

export default Tabs;