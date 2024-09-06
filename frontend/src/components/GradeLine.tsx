// @ts-ignore
import { GradeColor } from "./GradeColor.tsx";
import { useState } from "react";
// @ts-ignore
import { getToken } from "../lib/context.ts";

function GradeLine({ grade, index, onDeleteGrade }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = getToken();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/grades/${grade.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(grade.id),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onDeleteGrade(grade.id);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error submitting grade:", error);
    }
  };

  return (
    <li className="w-full p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg text-gray-800">{index}.</span>
        <div>
          {/* @ts-ignore */}
          <GradeColor
            grade={grade.grade}
            className=" text-xl font-semibold text-indigo-600"
          >
            /6
          </GradeColor>
          <button
            onClick={handleMenuToggle}
            className="align-middle ml-4 text-gray-500 hover:text-gray-800 transition-colors duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ellipsis-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        {isMenuOpen && (
          <div className="w-fit mt-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md p-3">
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <span className="text-gray-500 text-sm">Detail:</span>
        {grade.detail && <p className="text-gray-700 mt-1">{grade.detail}</p>}
      </div>
    </li>
  );
}

export default GradeLine;
