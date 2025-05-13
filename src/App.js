import React, { useState } from 'react';
import { createStorage } from './utils/storage';
import Navigation from './components/Navigation';
import ReservationForm from './components/ReservationForm';
import ConfirmationScreen from './components/ConfirmationScreen';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [currentView, setCurrentView] = useState('reservation');
  const [confirmationData, setConfirmationData] = useState(null);

  // Initialize storage
  createStorage('reservations', []);

  const handleReservationSuccess = (reservation) => {
    setConfirmationData(reservation);
    setCurrentView('confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-game text-yellow-400 mb-2">TACO GAME</h1>
          <p className="text-gray-400">Evento Final de Temporada: The Last of Us Parte II</p>
          <p className="text-gray-500">25 de Mayo 2025</p>
        </header>

        <Navigation currentView={currentView} setCurrentView={setCurrentView} />

        <main>
          {currentView === 'reservation' && (
            <ReservationForm onReservationSuccess={handleReservationSuccess} />
          )}
          {currentView === 'confirmation' && confirmationData && (
            <ConfirmationScreen reservation={confirmationData} />
          )}
          {currentView === 'admin' && <AdminPanel />}
        </main>
      </div>
    </div>
  );
};

export default App;

// DONE