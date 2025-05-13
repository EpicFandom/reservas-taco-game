import React, { useState } from 'react';
import Swal from 'sweetalert2';
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

  const validateWhatsApp = (number) => {
    return /^\d{10}$/.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateWhatsApp(formData.whatsapp)) {
      Swal.fire({
        icon: 'error',
        title: 'Número inválido',
        text: 'El número de WhatsApp debe tener exactamente 10 dígitos.',
      });
      return;
    }

    const reservations = getStorage('reservations');
    const newReservation = {
      ...formData,
      date: new Date().toISOString(),
      eventDate: '2025-05-25'
    };

    setStorage('reservations', [...reservations, newReservation]);

    // Mostrar alerta con imagen y confirmación
    Swal.fire({
      title: '¡Reserva registrada!',
      html: `
        <p><strong>Este registro no asegura tu lugar.</strong></p>
        <p>Nos pondremos en contacto contigo vía WhatsApp para confirmar tu asistencia.</p>
        ${formData.isGroup && formData.groupName
          ? `<p>Comparte este nombre de grupo con tus acompañantes:</p>
             <p style="font-weight:bold; font-size:18px;">${formData.groupName}</p>`
          : ''
        }
      `,
      imageUrl: 'https://i.imgur.com/Wx5xoxV.png',
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonText: 'Aceptar',
    });

    // Limpia el formulario
    setFormData({
      name: '',
      age: '',
      whatsapp: '',
      people: 1,
      isGroup: false,
      groupName: '',
      acceptRecording: false
    });

    onReservationSuccess(newReservation);
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
          placeholder="Ej: 5522450250"
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
          <label className="block text-gray-300 mb-2">Nombre del Grupo (elige un código único)</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="Ej: TeamEllie25, FirefliesCondesa"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            required={formData.isGroup}
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
