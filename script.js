async function reservar() {
  const nombre = document.getElementById('nombre').value;
  const dni = document.getElementById('dni').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  const res = await fetch('/api/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, dni, fecha, hora })
  });

  const data = await res.json();
  alert(data.mensaje);
  cargarReservas();
}

async function cargarReservas() {
  const res = await fetch('/api/reservas');
  const data = await res.json();
  const tabla = document.getElementById('tabla-reservas');
  tabla.innerHTML = '';
  data.forEach(r => {
    tabla.innerHTML += `
      <tr>
        <td>${r.nombre}</td>
        <td>${r.dni}</td>
        <td>${r.fecha}</td>
        <td>${r.hora}</td>
        <td>${r.pagado ? '✔️' : '❌'}</td>
      </tr>`;
  });
}

cargarReservas();
