import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <section className="text-center bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Logga in</h1>
        <p className="text-gray-700 mb-8">
          Här kommer inloggningsformuläret att visas.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg transition bg-indigo-600 text-white"
        >
          Till startsidan
        </Link>
      </section>
    </main>
  );
};

export default Login;
