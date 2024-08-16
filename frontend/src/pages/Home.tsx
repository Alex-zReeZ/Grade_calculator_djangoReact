function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Calculateur de Notes
        </h1>
      </header>

      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Bienvenue sur le Calculateur de Notes
          </h2>
          <p className="text-gray-600 mb-6">
            Utilisez cet outil pour calculer vos notes et obtenir la moyenne de
            vos résultats scolaires.
          </p>
          <a
            href="/login"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Mes Notes
          </a>
        </section>
      </main>

      <footer className="mt-8 text-gray-500">© 2024 Mon App Scolaire</footer>
    </div>
  );
}

export default Home;
