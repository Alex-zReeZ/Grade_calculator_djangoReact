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
    <li className="w-full p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:border-amber-500 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <span className="font-extrabold text-2xl text-amber-600">{index}.</span>
        <button
          onClick={handleMenuToggle}
          className="ml-4 text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-in-out"
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

      <div className="flex flex-col gap-y-5">
        {/* @ts-ignore */}
        <GradeColor
          grade={grade.grade}
          className="w-fit p-2 px-5 rounded-lg bg-gray-50 border"
        >
          /6
        </GradeColor>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
          <span className="block text-gray-500 text-sm mb-2">Detail:</span>
          {grade.detail ? (
            <p className="text-gray-700 text-md font-medium">{grade.detail}</p>
          ) : (
            <p className="text-gray-400 italic">No detail provided</p>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="relative">
          <div className="absolute -top-52 right-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md">
            <button
              onClick={handleDelete}
              className="w-full text-center px-4 py-2 bg-red-500 text-white rounded-lg hover:text-red-700 hover:bg-gray-100 transition-colors duration-500 ease-in-out"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default GradeLine;
