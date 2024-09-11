import { useEffect, useState } from "react";
// @ts-ignore
import AddGrades from "../components/AddGrades.tsx";
// @ts-ignore
import GradeLine from "./GradeLine.tsx";
// @ts-ignore
import DisplayAverage from "./DisplayAverage.tsx";
// @ts-ignore
import UserProfile from "./UserProfile.tsx";
// @ts-ignore
import { getBranches, getToken } from "../lib/context.ts";

interface DynamicTemplateProps {
  branchName: string;
  fetchUrl: string;
}

interface Grade {
  id: number;
  subject: string;
  grade: number;
  detail: string;
}

const DynamicTemplate: React.FC<DynamicTemplateProps> = ({
  branchName,
  fetchUrl,
}) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [links, setLinks] = useState<{ id: number; name: string }[]>([]);

  const token = getToken();

  useEffect(() => {
    const fetchBranches = async () => {
      const branches = await getBranches();
      setLinks(branches);
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setGrades(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };

    fetchGrades();
  }, [fetchUrl]);

  const addGrade = (newGrade: Grade) => {
    setGrades((prevGrades) => [...prevGrades, newGrade]);
  };

  const deleteGrade = (gradeId: number) => {
    setGrades((prevGrades) =>
      prevGrades.filter((grade) => grade.id !== gradeId),
    );
  };

  const isModule = branchName === "Module" || branchName === "TIP";
  const branch = links.find((link) => link.name === branchName);
  const branchId = branch ? branch.id : null;

  return (
    <body className="min-h-screen bg-bg-image bg-cover">
      <div className="p-4">
        <header>
          <h1 className="w-fit px-10 p-4 bg-white rounded-2xl text-4xl font-bold text-amber-600 shadow-lg">
            GradiX &nbsp; - &nbsp; {branchName}
          </h1>
          <div className="absolute top-5 right-5">
            <UserProfile />
          </div>
        </header>
      </div>
      <main className="p-4 min-h-full flex flex-col">
        <section>
          <div className="w-full flex justify-between gap-x-2 mb-2">
            {links.map((branch) => (
              <a
                key={branch.id}
                href={`/${branch.name}`}
                className={`w-full text-center p-2 border-2 bg-gray-100 rounded-2xl font-semibold ${
                  branch.name === branchName
                    ? "bg-white text-amber-600 border-amber-600 outline-none"
                    : "hover:border-amber-600"
                }`}
              >
                {branch.name}
              </a>
            ))}
          </div>
          <div className="flex h-fit gap-x-20 py-8 w-full rounded-2xl">
            <div className="flex flex-col w-[500px]">
              <div className="w-full bg-white p-5 rounded-2xl">
                <AddGrades onAddGrade={addGrade} branchName={branchName} />
              </div>
              <div className="w-full mt-5 bg-white p-5 rounded-2xl">
                <DisplayAverage
                  grades={grades}
                  module={isModule}
                  branchId={branchId}
                  branchName={branchName}
                />
              </div>
            </div>
            <div className="w-full bg-white p-5 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4">Your Grades:</h2>
              {grades && grades.length === 0 && (
                <p className="grid h-3/4 items-center text-center text-4xl">
                  No grades yet!
                </p>
              )}
              <ul className="grid grid-cols-2 gap-5">
                {Array.isArray(grades) &&
                  grades.map((grade, index) => (
                    <GradeLine
                      key={index}
                      grade={grade}
                      index={index + 1}
                      onDeleteGrade={deleteGrade}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};

export default DynamicTemplate;
