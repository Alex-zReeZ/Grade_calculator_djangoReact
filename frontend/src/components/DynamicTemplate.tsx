// frontend/src/template/DynamicTemplate.tsx
import { useEffect, useState } from "react";

interface DynamicTemplateProps {
    branchName: string;
    fetchUrl: string;
}

const DynamicTemplate: React.FC<DynamicTemplateProps> = ({branchName, fetchUrl}) => {
    const [grades, setGrades] = useState([]);

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

    const allBranch = ["Maths", "francais", "Anglais", "Allemand", "dc-sci", "dc-maths", "dc-histoire", "eco&droit", "TIP"];

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
                        <div className="w-full flex space-x-[-10px]"> {/* Espace négatif entre les onglets */}
                            {allBranch.map((branch, index) => (
                                <a
                                    key={index}
                                    href={`/${branch}`}
                                    className={`p-4 bg-white rounded-t-2xl hover:border-2 hover:border-blue-600 hover:border-b-0 hover:z-0 text-center w-[200px] font-semibold ${
                                        branch === branchName ? "bg-gray-100 text-blue-600 border-2 border-b-0 border-blue-600 -mt-2 z-0" : ""
                                    }`}
                                >
                                    {branch}
                                </a>
                            ))}
                        </div>
                        <div className="p-8 px-10 bg-white w-full rounded-b-2xl">
                            <h1>
                                Grades
                            </h1>
                        </div>
                    </section>
                </main>
            </div>
        </>

    );
};

export default DynamicTemplate;