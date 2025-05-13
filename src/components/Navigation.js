import React from 'react';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-gray-900 p-4 rounded-lg mb-6">
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => setCurrentView('reservation')}
            className={`px-4 py-2 rounded font-game ${currentView === 'reservation' ? 'bg-yellow-600 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            Reservar
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentView('admin')}
            className={`px-4 py-2 rounded font-game ${currentView === 'admin' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            Admin
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;