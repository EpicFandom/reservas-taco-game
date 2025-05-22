import React from 'react';

const ReservationForm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-yellow-400 text-center mb-4">
        TACO GAME SUCURSAL CONDESA
      </h1>

      <p className="text-white text-center text-lg mb-2">
        El formulario de pre-registro ha sido cerrado.
      </p>

      <p className="text-yellow-300 text-center text-sm mb-6">
        Gracias por tu interés. Síguenos en nuestras redes para futuros eventos.
      </p>

      <img
        src="https://i.postimg.cc/W4JQW2K2/siguenos-redes.png"
        alt="Síguenos en redes"
        className="w-full max-w-md rounded-lg shadow-lg mb-6"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://www.instagram.com/tacogamecondesa/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded text-center"
        >
          Instagram Taco Game
        </a>

        <a
          href="https://www.instagram.com/epic_fandom/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded text-center"
        >
          Instagram Epic Fandom
        </a>
      </div>
    </div>
  );
};

export default ReservationForm;
