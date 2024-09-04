// @ts-ignore
import { GradeColor } from "./GradeColor.tsx";
import { useEffect } from "react";

interface DisplayAverageProps {
  grades: { grade: number }[];
  module: boolean;
  branchId: number | null;
  branchName: string;
}

const DisplayAverage: React.FC<DisplayAverageProps> = ({ grades, module, branchId, branchName }) => {
  const calculateAverage = (grades: { grade: number }[]): number => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, { grade }) => sum + grade, 0);
    return module
        ? Math.round((total / grades.length) * 10) / 10
        : Math.round((total / grades.length) * 2) / 2;
  };

  const updateBranchAverage = async (branchId: number, roundedAverage: number) => {
    try {
      const response = await fetch(`http://localhost:8000/branches/${branchId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: branchName, average: roundedAverage }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update branch: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating branch average:", error);
    }
  };

  useEffect(() => {
    if (branchId !== null) {
      const roundedAverage = calculateAverage(grades);
      updateBranchAverage(branchId, roundedAverage);
    }
  }, [branchId, grades, module]);

  const roundedAverage = calculateAverage(grades);

  return (
      <div>
        <h2 className="text-xl font-semibold mt-6">Average:</h2>
        <div className="flex items-center space-x-4 mt-2">
          <GradeColor grade={roundedAverage} />
        </div>
      </div>
  );
};

export default DisplayAverage;
