// @ts-ignore
import UserProfile from "../components/UserProfile.tsx";
import { useState } from "react";
// @ts-ignore
import RadialBarChart from "../components/RadialBarChart.tsx";
// @ts-ignore
import PolarAreaChart from "../components/PolarAreaChart.tsx";

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
      href: "/Module",
      text: "Module",
      className: "col-span-2",
    },
    {
      href: "/TIP",
      text: "TIP",
      className: "col-span-2",
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="absolute right-5 top-5 flex flex-row gap-x-5 ">
        <button
          className="p-3 rounded-2xl bg-white shadow-2xl hover:border-2 hover:border-amber-600"
          onClick={() => setOpen(!open)}
        >
          Year data
        </button>
        <UserProfile />
      </nav>
      {open && (
        <>
          <div className="absolute right-24 top-[84px] w-[89%] h-[81%] bg-white rounded-2xl shadow-2xl z-0">
            <div className="grid grid-cols-2 w-full h-full items-center">
              <RadialBarChart />
              <PolarAreaChart />
            </div>
          </div>
        </>
      )}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-600">GradiX</h1>
        </header>
        <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bienvenue sur le Calculateur de Notes
            </h2>
            <p className="text-gray-600 mb-6">
              Utilisez cet outil pour calculer vos notes et obtenir la moyenne
              de vos résultats scolaires.
            </p>
          </section>
          <section className="grid grid-cols-2 gap-2 w-full h-full p-5 bg-gray-100 shadow-lg rounded-2xl">
            {links.map(({ href, text, className = "" }, index) => (
              <a
                key={index}
                href={href}
                className={`text-center py-5 p-4 bg-white shadow-md rounded-lg hover:border-2 hover:border-amber-600 ${className}`}
              >
                <span className="inset-0 flex items-center justify-center font-bold">
                  {text}
                </span>
              </a>
            ))}
          </section>
          <div className="text-center text-gray-500 mt-7">
            <p>*DF: Discipline Fondamentale</p>
            <p>*DC: Discipline Complémentaire</p>
          </div>
        </main>
        <footer className="mt-8 text-gray-500">© 2024 GradiX</footer>
      </div>
    </>
  );
}

export default Home;
