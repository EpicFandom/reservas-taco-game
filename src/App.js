import React from 'react';
import ReservationForm from './components/ReservationForm';
import PanelAdmin from './components/PanelAdmin';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const esAdmin = queryParams.get('admin') === 'epic.2025';
  const [vista, setVista] = React.useState(esAdmin ? 'admin' : 'reserva');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Solo mostramos botón de Admin si aplica */}
      {esAdmin && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            className={`px-4 py-2 rounded ${vista === 'admin' ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => setVista('admin')}
          >
            Admin
          </button>
        </div>
      )}

      <div className="mt-6">
        {vista === 'reserva' && <ReservationForm />}
        {vista === 'admin' && esAdmin && <PanelAdmin />}
      </div>
    </div>
  );
}

export default App;
