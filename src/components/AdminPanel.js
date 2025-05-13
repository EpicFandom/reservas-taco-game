import React, { useState } from 'react';
import { getStorage } from '../utils/storage';

const AdminPanel = () => {
  const [reservations, setReservations] = useState(getStorage('reservations'));
  const [filterGroup, setFilterGroup] = useState('');

  const filteredReservations = filterGroup
    ? reservations.filter(r => r.groupName?.toLowerCase().includes(filterGroup.toLowerCase()))
    : reservations;

  const exportToCSV = () => {
    const headers = ['Nombre', 'Edad', 'WhatsApp', 'Personas', 'Grupo', 'Fecha Reserva'];
    const csvContent = [
      headers.join(','),
      ...filteredReservations.map(r => [
        `"${r.name}"`,
        r.age,
        `"${r.whatsapp}"`,
        r.people,
        `"${r.groupName || ''}"`,
        `"${new Date(r.date).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reservas_taco_game_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-red-500">
      <h2 className="text-red-400 text-2xl mb-4 font-game">Panel de Administración</h2>
      
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Filtrar por Grupo</label>
        <input
          type="text"
          value={filterGroup}
          onChange={(e) => setFilterGroup(e.target.value)}
          placeholder="Nombre del grupo"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={exportToCSV}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors mr-2"
        >
          Exportar a CSV
        </button>
        <span className="text-gray-400 ml-2">{filteredReservations.length} reservas</span>
      </div>

      <div className="overflow-auto max-h-96">
        <table className="w-full text-gray-300">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Edad</th>
              <th className="p-2 text-left">WhatsApp</th>
              <th className="p-2 text-left">Personas</th>
              <th className="p-2 text-left">Grupo</th>
              <th className="p-2 text-left">Fecha Reserva</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="p-2">{reservation.name}</td>
                <td className="p-2">{reservation.age}</td>
                <td className="p-2">{reservation.whatsapp}</td>
                <td className="p-2">{reservation.people}</td>
                <td className="p-2">{reservation.groupName || '-'}</td>
                <td className="p-2">{new Date(reservation.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;