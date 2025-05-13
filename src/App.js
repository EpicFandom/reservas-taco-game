import React from 'react';
import ReservationForm from './components/ReservationForm';
import PanelAdmin from './components/PanelAdmin';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const esAdmin = queryParams.get('admin') === 'epic.2025';
  const [vista, setVista] = React.useState('reserva');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold text-center text-yellow-400">
        TACO GAME SUCURSAL CONDESA
      </h1>
      <p className="text-center text-sm mt-1">
        Evento Final de Temporada: The Last of Us Parte II<br />
        25 de Mayo 2025
      </p>

      <div className="flex justify-center mt-4 gap-4">
        <button
          className={`px-4 py-2 rounded ${vista === 'reserva' ? 'bg-yellow-500' : 'bg-gray-700'}`}
          onClick={() => setVista('reserva')}
        >
          Reservar
        </button>

        {esAdmin && (
          <button
            className={`px-4 py-2 rounded ${vista === 'admin' ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => setVista('admin')}
          >
            Admin
          </button>
        )}
      </div>

      <div className="mt-6">
        {vista === 'reserva' && <ReservationForm />}
        {vista === 'admin' && esAdmin && <PanelAdmin />}
      </div>
    </div>
  );
}

export default App;

// DONE
