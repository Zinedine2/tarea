const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const path = './data/reservas.json';

function cargarReservas() {
  if (!fs.existsSync(path)) return [];
  return JSON.parse(fs.readFileSync(path));
}

function guardarReservas(reservas) {
  fs.writeFileSync(path, JSON.stringify(reservas, null, 2));
}

app.get('/api/reservas', (req, res) => {
  res.json(cargarReservas());
});

app.post('/api/reservas', (req, res) => {
  const { nombre, dni, fecha, hora } = req.body;
  const reservas = cargarReservas();

  const existe = reservas.some(r => r.fecha === fecha && r.hora === hora);
  if (existe) return res.json({ mensaje: 'Ese horario ya está reservado' });

  reservas.push({ nombre, dni, fecha, hora, pagado: false });
  guardarReservas(reservas);
  res.json({ mensaje: 'Reserva registrada con éxito' });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
