function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">GradiX</h1>
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
        </section>
        <section className="grid grid-cols-2 gap-2 w-full h-full p-5 bg-gray-100 shadow-lg rounded-2xl">
          <a
            href="/French"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            Français
          </a>
          <a
            href="/German"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            Allemand
          </a>
          <a
            href="/English"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            Anglais
          </a>
          <a
            href="/DC-Maths"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            Maths DC
          </a>
          <a
            href="/Science"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            DF - Science Naturelle
          </a>
          <a
            href="/Maths"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            DF - Maths
          </a>
          <a
            href="/Histoire"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            DC - Histoire
          </a>
          <a
            href="/Economics and Law"
            className="text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            DC - Economie et droit
          </a>
          <a
            href="/TIP"
            className="col-span-2 text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600"
          >
            TIP
          </a>
        </section>
      </main>
      <footer className="mt-8 text-gray-500">© 2024 Mon App Scolaire</footer>
    </div>
  );
}

export default Home;
