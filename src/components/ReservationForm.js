import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    whatsapp: '',
    people: 1,
    mesaOption: '',
    nombreMesaCrear: '',
    nombreMesaUnirse: '',
    acceptRecording: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validarNombre = (nombre) => {
    const partes = nombre.trim().split(' ');
    return partes.length >= 2 && partes.every(p => p.length >= 3);
  };

  const validarWhatsapp = (num) => /^\d{10}$/.test(num);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarNombre(formData.name)) {
      return Swal.fire({
        icon: 'error',
        title: 'Nombre inválido',
        text: 'Ingresa al menos nombre y apellido (mínimo 3 letras cada uno).',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
    }

    if (!validarWhatsapp(formData.whatsapp)) {
      return Swal.fire({
        icon: 'error',
        title: 'Número inválido',
        text: 'El número de WhatsApp debe tener exactamente 10 dígitos.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
    }

    if (formData.mesaOption === 'crear' && !formData.nombreMesaCrear.trim()) {
      return Swal.fire({
        icon: 'error',
        title: 'Nombre de mesa requerido',
        text: 'Por favor, escribe un nombre de mesa para compartir.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
    }

    if (formData.mesaOption === 'unirse' && !formData.nombreMesaUnirse.trim()) {
      return Swal.fire({
        icon: 'error',
        title: 'Nombre de mesa requerido',
        text: 'Por favor, escribe el nombre de la mesa que te compartieron.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
    }

    const groupName =
      formData.mesaOption === 'crear'
        ? formData.nombreMesaCrear.trim()
        : formData.mesaOption === 'unirse'
        ? formData.nombreMesaUnirse.trim()
        : '';

    const payload = {
      ...formData,
      groupName,
      date: new Date().toISOString(),
      eventDate: '2025-05-25',
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzWtF29EQqUaSo3WET9SNX_eXv2-QLw2uKq-Ew8P-ABvhv3kruApR8K7wsTtCurKtvnQA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const mensajeMesa = formData.mesaOption === 'crear'
        ? `<p style="margin-bottom: 10px;">Comparte el nombre de tu mesa con tu grupo: <strong>${groupName}</strong><br>Esto nos ayudará a ubicarlos juntos o lo más cerca posible.</p>`
        : '';

      Swal.fire({
        title: '<strong>¡Gracias por registrarte!</strong>',
        html: `
          ${mensajeMesa}
          <p style="margin-bottom: 10px;"><strong>Te contactaremos por WhatsApp si tu lugar es confirmado.</strong></p>
          <p style="margin-bottom: 10px;"><strong>Recuerda:</strong> el evento tiene una cuota de <strong>$50 por persona</strong>, que incluye una bebida.</p>
          <p style="margin-bottom: 0;"><em>Este mensaje no confirma tu reserva aún.</em></p>
        `,
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#facc15',
        confirmButtonText: 'Aceptar',
      });

      setFormData({
        name: '',
        age: '',
        whatsapp: '',
        people: 1,
        mesaOption: '',
        nombreMesaCrear: '',
        nombreMesaUnirse: '',
        acceptRecording: false,
      });
    } catch (error) {
      alert("Ocurrió un error al guardar la reserva. Intenta más tarde.");
      console.error(error);
    }
  };

  return null; // Este componente se exporta para integrarse con el resto del JSX
};

export default ReservationForm;
