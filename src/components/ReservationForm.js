import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    whatsapp: '',
    people: 1,
    tableName: '',
    joinTableName: '',
    acceptRecording: false,
  });

  const [showGroupOptions, setShowGroupOptions] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Lógica para asegurar que solo un campo de grupo esté activo
    if (name === 'tableName' && value !== '') {
      setFormData((prev) => ({ ...prev, [name]: value, joinTableName: '' }));
    } else if (name === 'joinTableName' && value !== '') {
      setFormData((prev) => ({ ...prev, [name]: value, tableName: '' }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const validarNombre = (nombre) => {
    const partes = nombre.trim().split(' ');
    return partes.length >= 2 && partes.every(p => p.length >= 3);
  };

  const validarWhatsapp = (num) => {
    return /^\d{10}$/.test(num);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarNombre(formData.name)) {
      Swal.fire({
        icon: 'error',
        title: 'Nombre inválido',
        text: 'Ingresa al menos nombre y apellido (mínimo 3 letras cada uno).',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
      return;
    }

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

    if (formData.tableName && formData.joinTableName) {
      Swal.fire({
        icon: 'error',
        title: 'Solo uno de los campos de grupo puede ser llenado',
        text: 'Elige entre crear un nombre de mesa o unirte a una existente.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
      return;
    }

    const finalGroup = formData.tableName || formData.joinTableName || null;

    const payload = {
      ...formData,
      groupName: finalGroup,
      date: new Date().toISOString(),
      eventDate: '2025-05-25',
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzWtF29EQqUaSo3WET9SNX_eXv2-QLw2uKq-Ew8P-ABvhv3kruApR8K7wsTtCurKtvnQA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const groupMessage = finalGroup
        ? `<p style="margin-bottom: 10px;">Nombre de la mesa: <strong>${finalGroup}</strong></p>`
        : '';

      Swal.fire({
        title: '<strong>¡Gracias por registrarte!</strong>',
        html: `
          ${groupMessage}
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
        tableName: '',
        joinTableName: '',
        acceptRecording: false,
      });
      setShowGroupOptions(false);
    } catch (error) {
      alert("Ocurrió un error al guardar la reserva. Intenta más tarde.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-yellow-400 text-center mt-6">
        TACO GAME SUCURSAL CONDESA
      </h1>
      <p className="text-white text-center mt-1">
        Evento Final de Temporada: The Last of Us Parte II <br />
        <span className="text-sm text-yellow-300">25 de Mayo 2025</span>
      </p>
      <p className="text-yellow-300 text-center mt-2 text-sm italic">
        Este formulario nos permitirá contactarte. Recuerda: es cupo limitado.
      </p>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-yellow-500 mt-4">
        <h2 className="text-yellow-400 text-2xl mb-4 font-game">Formulario de Pre-Registro</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Nombre y Apellido</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Edad (Solo mayores de 18 años)</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Número de WhatsApp (Vía de comunicación para confirmar tu reserva)</label>
          <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="Ej: 5522450250" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Número de personas (1 a 4 máximo por reserva - Cupo limitado)</label>
          <select name="people" value={formData.people} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" checked={showGroupOptions} onChange={() => setShowGroupOptions(!showGroupOptions)} />
            Eres un grupo mayor a 4 personas o tienes el nombre de una mesa y quieres unirte. Selecciona la casilla.
          </label>
        </div>

        {showGroupOptions && (
          <>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Crear nombre de mesa (para compartirlo con tus acompañantes)</label>
              <input type="text" name="tableName" value={formData.tableName} onChange={handleChange} placeholder="Ej: Mesa BonviBand" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Unirte a una mesa existente (escribe el nombre que te compartieron)</label>
              <input type="text" name="joinTableName" value={formData.joinTableName} onChange={handleChange} placeholder="Ej: Mesa BonviBand" className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white" />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" name="acceptRecording" checked={formData.acceptRecording} onChange={handleChange} required className="mr-2" />
            Este evento podrá ser grabado con fines promocionales. Al asistir aceptas que tu imagen pueda aparecer en contenido de redes sociales.
          </label>
        </div>

        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded transition-colors">
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
