import React, { useState } from 'react';
import { getStorage, setStorage } from '../utils/storage';

const ReservationForm = ({ onReservationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    whatsapp: '',
    people: 1,
    isGroup: false,
    groupName: '',
    acceptRecording: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Asegurarse de que existe una lista previa
    const existing = getStorage('reservations') || [];

    const newReservation = {
      ...formData,
      date: new Date().toISOString(),
      eventDate: '2025-05-25'
    };

    // Guardar nueva reserva
    setStorage('reservations', [...existing, newReservation]);

    // Confirmación
    alert('✅ ¡Reserva registrada con éxito!');

    // Limpiar formulario
    setFormData({
      name: '',
      age: '',
      whatsapp: '',
      people: 1,
      isGroup: false,
      groupName: '',
      acceptRecording: false
    });

    if (onReservationSuccess) {
      onReservationSuccess(newReservation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-yellow-500">
      <h2 className="text-yellow-400 text-2xl mb-4 font-game">Reserva tu Lugar</h2>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Edad</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
          min="18"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">WhatsApp</label>
        <input
          type="tel"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Número de Personas (max 2)</label>
        <select
          name="people"
          value={formData.people}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="flex items-center text-gray-300">
          <input
            type="checkbox"
            name="isGroup"
            checked={formData.isGroup}
            onChange={handleChange}
            className="mr-2"
          />
          ¿Eres parte de un grupo?
        </label>
      </div>

      {formData.isGroup && (
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Nombre del Grupo (elige un código único para tu grupo)</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="Ej: Teamellie25, MesaEllie23, FirefliesDan55i"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="flex items-center text-gray-300">
          <input
            type="checkbox"
            name="acceptRecording"
            checked={formData.acceptRecording}
            onChange={handleChange}
            className="mr-2"
            required
          />
          Acepto que puedo ser grabado durante el evento
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded transition-colors"
      >
        Confirmar Reserva
      </button>
    </form>
  );
};

export default ReservationForm;
