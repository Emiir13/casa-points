// Proyecto: CasaPoints - App para gamificar tareas del hogar
// Etapa 1: Estructura inicial con React + funcionalidad mínima
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function App() {
  const tareas = [
    { name: 'Lavar platos', points: 10 },
    { name: 'Barrer', points: 5 },
    { name: 'Limpiar el baño', points: 20 },
    { name: 'Cocinar', points: 20 },
    { name: 'Sacar basura', points: 4 },
    { name: 'Lavar la ropa', points: 10 },
    { name: 'Limpiar el patio', points: 10 },
    { name: 'Proyecto', points: 60 },
    { name: 'Poner la mesa', points: 5 },
    { name: 'Guardar la ropa', points: 10 },
    { name: 'Planchar', points: 20 },
    { name: 'Sorprender', points: 25 },
    { name: 'Gimnasio', points: 3 },
    { name: 'Caminata', points: 1 },
    { name: 'Lavar las motos', points: 30 },
    { name: 'Lavar Camioneta', points: 40 },
    { name: 'Lavar los pisos', points: 10 },
    { name: 'Gestión de agua', points: 5 },
    { name: 'Orden y Limpieza', points: 10 },
    { name: 'Secar los platos', points: 5 },
    { name: 'Regar las plantas', points: 3 },
    { name: 'Barrer pasillo', points: 3 },
    { name: 'Garage y frente', points: 10 },
    { name: 'Canasto', points: 30 },
    { name: 'varios', points: 3 },
    { name: 'mandados', points: 4 }
  ];

  const usuarios = ['Emir', 'Guille'];

  const [registro, setRegistro] = useState(() => {
    const guardado = localStorage.getItem('registroCasaPoints');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [usuario, setUsuario] = useState('');
  const [tarea, setTarea] = useState('');

  const registrarTarea = () => {
    if (!usuario || !tarea) return;
    const tareaObj = JSON.parse(tarea);
    const fecha = new Date().toLocaleDateString();
    const nuevaEntrada = { usuario, tarea: tareaObj.name, puntos: tareaObj.points, fecha };
    const actualizado = [...registro, nuevaEntrada];
    setRegistro(actualizado);
    setUsuario('');
    setTarea('');
  };

  const resetearRegistro = () => {
    setRegistro([]);
    localStorage.removeItem('registroCasaPoints');
  };

  useEffect(() => {
    localStorage.setItem('registroCasaPoints', JSON.stringify(registro));
  }, [registro]);

  const tareasPorUsuario = (nombre) => registro.filter(r => r.usuario === nombre);
  const puntosTotales = (nombre) => tareasPorUsuario(nombre).reduce((total, r) => total + r.puntos, 0);

  const dataGrafico = usuarios.map(nombre => ({ name: nombre, value: puntosTotales(nombre) }));
  const COLORS = ['#a0c4ff', '#ffb3c1'];

  const styles = {
    page: {
      backgroundColor: '#1e1e1e',
      minHeight: '100vh',
      padding: '0',
      margin: '0'
    },
    container: {
      fontFamily: 'Arial',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      color: '#f0f0f0'
    },
    select: {
      backgroundColor: '#2a2a2a',
      color: '#f0f0f0',
      border: '1px solid #555',
      borderRadius: '6px',
      padding: '0.5rem',
      marginBottom: '1rem'
    },
    button: {
      backgroundColor: '#3f3f3f',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem',
      backgroundColor: '#2a2a2a',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    thtd: {
      border: '1px solid #444',
      padding: '8px'
    },
    responsiveSection: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: '3rem',
      gap: '2rem'
    },
    userColumn: {
      flex: '1 1 300px'
    },
    chartWrapper: {
      flex: '1 1 300px',
      height: '300px'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>🏠 CasaPoints</h1>

        <section style={{ marginTop: '2rem' }}>
          <h2>Registrar tarea</h2>

          <select value={usuario} onChange={e => setUsuario(e.target.value)} style={styles.select}>
            <option value="">Seleccionar persona</option>
            {usuarios.map((nombre, idx) => (
              <option key={idx} value={nombre}>{nombre}</option>
            ))}
          </select>

          <select value={tarea} onChange={e => setTarea(e.target.value)} style={{ ...styles.select, marginLeft: '1rem' }}>
            <option value="">Seleccionar tarea</option>
            {tareas.map((t, idx) => (
              <option key={idx} value={JSON.stringify(t)}>{t.name} (+{t.points} pts)</option>
            ))}
          </select>

          <button onClick={registrarTarea} style={{ ...styles.button, marginLeft: '1rem' }}>✔ Registrar tarea</button>
          <button onClick={resetearRegistro} style={{ ...styles.button, marginLeft: '1rem', backgroundColor: 'darkred' }}>
            🔄 Reiniciar todo
          </button>
        </section>

        <section style={styles.responsiveSection}>
          <div style={{ flex: 2, display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {usuarios.map((nombre, idx) => (
              <div key={idx} style={styles.userColumn}>
                <h2>{nombre} - Total: {puntosTotales(nombre)} puntos</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.thtd}>Fecha</th>
                      <th style={styles.thtd}>Tarea</th>
                      <th style={styles.thtd}>Puntos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tareasPorUsuario(nombre).map((r, i) => (
                      <tr key={i}>
                        <td style={styles.thtd}>{r.fecha}</td>
                        <td style={styles.thtd}>{r.tarea}</td>
                        <td style={styles.thtd}>{r.puntos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div style={styles.chartWrapper}>
            <h2>Distribución de puntos</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataGrafico} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {dataGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}


