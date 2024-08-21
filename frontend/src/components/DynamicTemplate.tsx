import { useEffect, useState } from "react";
// @ts-ignore
import AddGrades from "../components/AddGrades.tsx";
// @ts-ignore
import GradeLine from "./GradeLine.tsx";

interface DynamicTemplateProps {
  branchName: string;
  fetchUrl: string;
}

interface Grade {
  subject: string;
  value: number;
  comment: string;
}

const DynamicTemplate: React.FC<DynamicTemplateProps> = ({
  branchName,
  fetchUrl,
}) => {
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setGrades(data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };

    fetchGrades();
  }, [fetchUrl]);

  const addGrade = (newGrade: Grade) => {
    setGrades((prevGrades) => [...prevGrades, newGrade]);
  };

  const allBranch = [
    "Maths",
    "French",
    "English",
    "German",
    "Science",
    "Maths",
    "Histoire",
    "Economics and Law",
    "TIP",
  ];

  return (
    <>
      <div className="p-4 bg-gray-100">
        <header>
          <h1 className="w-fit px-10 p-4 bg-white rounded-2xl text-4xl font-bold text-blue-600 shadow-lg">
            GradiX &nbsp; - &nbsp; {branchName}
          </h1>
        </header>
      </div>
      <div className="p-4 min-h-screen bg-gray-100 flex flex-col">
        <main>
          <section>
            <div className="w-full flex space-x-[-10px]">
              {allBranch.map((branch, index) => (
                <a
                  key={index}
                  href={`/${branch}`}
                  className={`p-4 bg-white rounded-t-2xl hover:border-2 hover:border-blue-600 hover:border-b-0 hover:z-0 text-center 0px] font-semibold ${
                    branch === branchName
                      ? "bg-gray-100 text-blue-600 border-2 border-b-0 border-blue-600 -mt-2 z-0"
                      : ""
                  }`}
                >
                  {branch}
                </a>
              ))}
            </div>
            <div className="p-8 px-10 bg-white w-full rounded-b-2xl">
              <h1 className="text-2xl font-bold mb-4">Notes pour {branchName}</h1>
              <AddGrades onAddGrade={addGrade} branchName={branchName} />
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Liste des notes:</h2>
                <ul className="space-y-4">
                  {grades.map((grade, index) => (
                    <GradeLine key={index} grade={grade} />
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default DynamicTemplate;