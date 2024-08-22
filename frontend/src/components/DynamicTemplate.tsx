import { useEffect, useState } from "react";
// @ts-ignore
import AddGrades from "../components/AddGrades.tsx";
// @ts-ignore
import GradeLine from "./GradeLine.tsx";
// @ts-ignore
import DisplayAverage from "./DisplayAverage.tsx";

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
    "Maths DC",
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
            <div className="flex h-fit gap-x-20 p-8 px-10 bg-white w-full rounded-b-2xl">
              <div className="flex flex-col w-[500px]">
                <div className="w-full">
                  <h1 className="text-2xl font-bold mb-4">
                    Your {branchName} Grades
                  </h1>
                  <AddGrades onAddGrade={addGrade} branchName={branchName} />
                </div>
                <div className="w-full mt-5">
                  <DisplayAverage grades={grades} />
                </div>
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-4">Your Grades:</h2>
                <ul className="grid grid-cols-2 gap-5">
                  {grades.map((grade, index) => (
                    <GradeLine key={index} grade={grade} index={index + 1} />
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
