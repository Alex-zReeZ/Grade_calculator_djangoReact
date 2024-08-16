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

    return (
        <>
            <div className="p-4 bg-gray-100">
                <header>
                    <h1 className="w-fit px-10 p-4 bg-white rounded-2xl text-4xl font-bold text-blue-600">GradiX &nbsp; - &nbsp; {branchName}</h1>
                </header>
            </div>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <section className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Notes pour {branchName}
                        </h2>
                        <ul>
                            {grades.map((grade, index) => (
                                <li key={index} className="text-gray-600 mb-2">
                                    {grade}
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>
        </>

    );
};

export default DynamicTemplate;