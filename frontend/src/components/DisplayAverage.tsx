// @ts-ignore
import { GradeColor } from "./GradeColor.tsx";
import { useState, useEffect } from "react";

interface DisplayAverageProps {
  grades: { grade: number }[];
  module: boolean;
  branchId: number | null;
}

const DisplayAverage: React.FC<DisplayAverageProps> = ({ grades, module, branchId }) => {

  const [newAverage, setNewAverage] = useState<number>();

  useEffect(() => {
    const HandleAverage = async (branchId: number) => {
      try {
        const response = await fetch(`http://localhost:8000/branches/${branchId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNewAverage(data.average);
      } catch (error) {
        console.error("Error fetching average grade:", error);
        return null;
      }
    };

    if (branchId !== null) {
      HandleAverage(branchId);
    }
  }, [branchId]);

  const average =
    grades.length > 0
      ? grades.reduce((acc, grade) => acc + grade.grade, 0) / grades.length
      : 0;

  const roundedAverage = module
    ? Math.round(average * 10) / 10
    : Math.round(average * 2) / 2;

  return (
    <div className="">
      <h2 className="text-xl font-semibold mt-6">Average:</h2>
      <div className="flex items-center space-x-4 mt-2">
        <GradeColor grade={newAverage} />
      </div>
    </div>
  );
};

export default DisplayAverage;