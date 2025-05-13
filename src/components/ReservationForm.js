import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getStorage, setStorage } from '../utils/storage';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    whatsapp: '',
    people: 1,
    isGroup: false,
    groupName: '',
    acceptRecording: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validarWhatsapp = (num) => {
    return /^\d{10}$/.test(num);
  };

  const generarNombreGrupo = () => {
    const base = formData.name.trim().split(' ')[0] || 'grupo';
    const codigo = Math.floor(Math.random() * 100);
    return `${base}${codigo}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarWhatsapp(formData.whatsapp)) {
      Swal.fire({
        icon: 'error',
        title: 'Número inválido',
        text: 'El número de WhatsApp debe tener exactamente 10 dígitos.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
      return;
    }

    const reservas = getStorage('reservations');
    const groupNameFinal = formData.isGroup
      ? formData.groupName || generarNombreGrupo()
      : null;

    const nuevaReserva = {
      ...formData,
      groupName: groupNameFinal,
      date: new Date().toISOString(),
      eventDate: '2025-05-25',
    };

    setStorage('reservations', [...reservas, nuevaReserva]);

    Swal.fire({
      title: '¡Reserva registrada!',
      html: `
        <p><strong>Este registro no asegura tu lugar.</strong><br>
        Nos pondremos en contacto contigo vía WhatsApp para confirmar tu asistencia.</p>
        ${
          groupNameFinal
            ? `<p>Comparte este nombre de grupo con tus acompañantes: <strong>${groupNameFinal}</strong></p>`
            : ''
        }
      `,
      imageUrl: 'https://i.postimg.cc/nhqvj92M/Zombiepng.png',
      imageHeight: 120,
      background: '#111827',
      color: '#fff',
      confirmButtonColor: '#8b5cf6',
      confirmButtonText: 'Aceptar',
    });

    setFormData({
      name: '',
      age: '',
      whatsapp: '',
      people: 1,
      isGroup: false,
      groupName: '',
      acceptRecording: false,
    });
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
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Edad</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="18"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">WhatsApp</label>
        <input
          type="tel"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          required
          placeholder="Ej: 5522450250"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
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
          <label className="block text-gray-300 mb-2">Nombre del Grupo</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="Ej: Fireflies25"
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
            required
            className="mr-2"
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
