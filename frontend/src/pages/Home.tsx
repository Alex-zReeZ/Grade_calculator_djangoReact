// @ts-ignore
import UserProfile from "../components/UserProfile.tsx";

function Home() {
  const links = [
    {
      href: "/Maths",
      text: "Maths - DF",
    },
    {
      href: "/French",
      text: "Français",
    },
    {
      href: "/English",
      text: "Anglais",
    },
    {
      href: "/German",
      text: "Allemand",
    },
    {
      href: "/Science",
      text: "Science Naturelle - DF",
    },
    {
      href: "/Maths DC",
      text: "Maths - DC",
    },
    {
      href: "/Histoire",
      text: "Histoire - DC",
    },
    {
      href: "/Economics and Law",
      text: "Economie et droit - DC",
    },
    {
      href: "/TIP",
      text: "TIP",
      className: "col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">GradiX</h1>
      </header>

      <UserProfile />

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
          {links.map(({ href, text, className = "" }, index) => (
            <a
              key={index}
              href={href}
              className={`text-center p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-blue-600 ${className}`}
            >
              {text}
            </a>
          ))}
        </section>
      </main>
      <footer className="mt-8 text-gray-500">© 2024 GradiX</footer>
    </div>
  );
}

export default Home;
