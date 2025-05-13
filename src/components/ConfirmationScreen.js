import React from 'react';

const ConfirmationScreen = ({ reservation }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-green-500">
      <h2 className="text-green-400 text-3xl mb-4 font-game">✅ ¡Gracias por registrarte!</h2>
      
      <div className="text-gray-300 mb-6 space-y-4">
        <p>Nombre: {reservation.name}</p>
        <p>WhatsApp: {reservation.whatsapp}</p>
        <p>Personas: {reservation.people}</p>
        
        {reservation.isGroup && (
          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <p className="mb-2">Si alguien más de tu grupo se va a registrar, pídeles que usen el mismo código de grupo que tú escribiste:</p>
            <p className="text-yellow-400 font-bold">{reservation.groupName}</p>
          </div>
        )}

        <div className="bg-gray-900 p-4 rounded border border-gray-700">
          <p className="mb-2">Si tu reserva es confirmada, nosotros te contactaremos por WhatsApp en las próximas horas.</p>
          <p className="text-yellow-400">🔸 Recuerda que el evento tiene una cuota de recuperación simbólica de $50 pesos por persona, que incluye una bebida (limonada, refresco o cerveza).</p>
        </div>

        <p className="text-gray-400 italic">🧠 Este mensaje no confirma tu lugar todavía. Muy pronto recibirás noticias nuestras.</p>
      </div>
    </div>
  );
};

export default ConfirmationScreen;

// DONE