import React, { useState, useEffect } from 'react';

const ClientManagement = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  const API_URL = '/clientes';

  const [formData, setFormData] = useState({
    codigo: '', nombre: '', apellido: '', direccion: '', telefono: '', email: ''
  });

  const [editFormData, setEditFormData] = useState({
    codigo: '', nombre: '', apellido: '', direccion: '', telefono: '', email: ''
  });

  // Estilos
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1a0000',
      color: '#ff3333',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    innerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem'
    },
    header: {
      marginBottom: '2.5rem'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '800',
      background: 'linear-gradient(to right, #ff0000, #ff6b6b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#9ca3af'
    },
    card: {
      backgroundColor: '#330000',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      marginBottom: '2.5rem'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#fff',
      borderBottom: '1px solid #660000',
      paddingBottom: '1rem',
      marginBottom: '1.5rem'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.25rem'
    },
    input: {
      padding: '0.75rem',
      backgroundColor: '#374151',
      border: '1px solid #660000',
      borderRadius: '0.5rem',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none'
    },
    button: {
      backgroundColor: '#dc2626',
      color: '#fff',
      fontWeight: '700',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    table: {
      width: '100%',
      textAlign: 'left',
      borderCollapse: 'collapse'
    },
    th: {
      padding: '1rem',
      backgroundColor: 'rgba(55, 65, 81, 0.5)',
      color: '#d1d5db',
      fontSize: '0.875rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      borderBottom: '1px solid #660000'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #660000'
    },
    modal: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 50
    },
    modalContent: {
      backgroundColor: '#330000',
      padding: '2rem',
      borderRadius: '0.75rem',
      border: '1px solid #660000',
      maxWidth: '28rem',
      width: '100%'
    },
    notification: {
      position: 'fixed',
      bottom: '1.25rem',
      right: '1.25rem',
      padding: '1rem',
      borderRadius: '0.5rem',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      zIndex: 50,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }
  };

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('No se pudo conectar a la API.');
      const data = await response.json();
      setClientes(data.clientes || []);
    } catch (error) {
      showNotification(error.message, true);
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error_detalle || result.mensaje || 'Error al registrar.');
      
      showNotification(result.mensaje || 'Cliente registrado con éxito.');
      setFormData({ codigo: '', nombre: '', apellido: '', direccion: '', telefono: '', email: '' });
      fetchClientes();
    } catch (error) {
      showNotification(error.message, true);
    }
  };

  const handleEdit = async (codigo) => {
    try {
      const response = await fetch(`${API_URL}/${codigo}`);
      if (!response.ok) throw new Error('No se pudo obtener la info del cliente.');
      const { cliente } = await response.json();
      
      setEditFormData({
        codigo: cliente.codigo,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        email: cliente.email
      });
      setShowEditModal(true);
    } catch (error) {
      showNotification(error.message, true);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { codigo, ...clienteActualizado } = editFormData;
      const response = await fetch(`${API_URL}/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteActualizado)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.mensaje || 'Error al actualizar.');
      
      showNotification(result.mensaje);
      setShowEditModal(false);
      fetchClientes();
    } catch (error) {
      showNotification(error.message, true);
    }
  };

  const handleDelete = (codigo) => {
    setClienteToDelete(codigo);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${clienteToDelete}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.mensaje || 'Error al eliminar.');
      
      showNotification(result.mensaje);
      setShowConfirmModal(false);
      setClienteToDelete(null);
      fetchClientes();
    } catch (error) {
      showNotification(error.message, true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          <h1 style={styles.title}>Panel de Clientes</h1>
          <p style={styles.subtitle}>Una interfaz dinámica para la gestión de datos de clientes.</p>
        </header>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Registrar Cliente</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" name="codigo" value={formData.codigo} onChange={handleInputChange} placeholder="Código Único" required style={styles.input} />
            <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" required style={styles.input} />
            <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} placeholder="Apellido" required style={styles.input} />
            <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} placeholder="Dirección" required style={styles.input} />
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} placeholder="Teléfono" required style={styles.input} />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required style={styles.input} />
            <button type="submit" style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'} onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}>
              <span>+</span>
              <span>Registrar Cliente</span>
            </button>
          </form>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Listado de Clientes</h2>
          <div style={{overflowX: 'auto'}}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Código</th>
                  <th style={styles.th}>Nombre Completo</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Teléfono</th>
                  <th style={{...styles.th, textAlign: 'center'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem', color: '#9ca3af'}}>Cargando...</td></tr>
                ) : clientes.length === 0 ? (
                  <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem', color: '#9ca3af'}}>
                    <p style={{fontWeight: '600'}}>No hay clientes registrados.</p>
                    <p style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>Usa el formulario de arriba para agregar el primero.</p>
                  </td></tr>
                ) : (
                  clientes.map((cliente) => (
                    <tr key={cliente.codigo} style={{transition: 'background-color 0.2s'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.5)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{...styles.td, fontFamily: 'monospace', fontSize: '0.875rem', color: '#9ca3af'}}>{cliente.codigo}</td>
                      <td style={{...styles.td, fontWeight: '500', color: '#fff'}}>{cliente.nombre} {cliente.apellido}</td>
                      <td style={{...styles.td, color: '#9ca3af'}}>{cliente.email}</td>
                      <td style={{...styles.td, color: '#9ca3af'}}>{cliente.telefono}</td>
                      <td style={{...styles.td, textAlign: 'center'}}>
                        <button onClick={() => handleEdit(cliente.codigo)} style={{color: '#60a5fa', cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.25rem', padding: '0.5rem', marginRight: '0.5rem'}}>✏️</button>
                        <button onClick={() => handleDelete(cliente.codigo)} style={{color: '#ef4444', cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.25rem', padding: '0.5rem'}}>🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div style={styles.modal} onClick={() => setShowEditModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '1.5rem'}}>Editar Cliente</h2>
            <form onSubmit={handleEditSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <input type="text" name="nombre" value={editFormData.nombre} onChange={handleEditInputChange} placeholder="Nombre" required style={styles.input} />
              <input type="text" name="apellido" value={editFormData.apellido} onChange={handleEditInputChange} placeholder="Apellido" required style={styles.input} />
              <input type="text" name="direccion" value={editFormData.direccion} onChange={handleEditInputChange} placeholder="Dirección" required style={styles.input} />
              <input type="tel" name="telefono" value={editFormData.telefono} onChange={handleEditInputChange} placeholder="Teléfono" required style={styles.input} />
              <input type="email" name="email" value={editFormData.email} onChange={handleEditInputChange} placeholder="Email" required style={styles.input} />
              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem'}}>
                <button type="button" onClick={() => setShowEditModal(false)} style={{...styles.button, backgroundColor: '#4b5563'}} onMouseOver={(e) => e.target.style.backgroundColor = '#6b7280'} onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'}>Cancelar</button>
                <button type="submit" style={{...styles.button, backgroundColor: '#16a34a'}} onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'} onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}>Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div style={styles.modal} onClick={() => setShowConfirmModal(false)}>
          <div style={{...styles.modalContent, maxWidth: '24rem', textAlign: 'center'}} onClick={(e) => e.stopPropagation()}>
            <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>⚠️</div>
            <h2 style={{fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem'}}>¿Estás seguro?</h2>
            <p style={{color: '#9ca3af', marginBottom: '1.5rem'}}>Esta acción no se puede deshacer.</p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
              <button onClick={() => setShowConfirmModal(false)} style={{...styles.button, backgroundColor: '#4b5563', width: '7rem'}} onMouseOver={(e) => e.target.style.backgroundColor = '#6b7280'} onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'}>Cancelar</button>
              <button onClick={confirmDelete} style={{...styles.button, backgroundColor: '#dc2626', width: '7rem'}} onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'} onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div style={{...styles.notification, backgroundColor: notification.isError ? '#ef4444' : '#16a34a'}}>
          <span>{notification.isError ? '❌' : '✅'}</span>
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;