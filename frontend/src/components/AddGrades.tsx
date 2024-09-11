import { useState } from "react";
// @ts-ignore
import { getToken } from "../lib/context.ts";

interface AddGradeFormProps {
  onAddGrade: (grade: {
    subject: string;
    grade: number;
    detail: string;
  }) => void;
  branchName: string;
}

const AddGrade: React.FC<AddGradeFormProps> = ({ onAddGrade, branchName }) => {
  const [grade, setgrade] = useState<number | null>(null);
  const [detail, setdetail] = useState("");

  const token = getToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/newGrade/${branchName}/add_grade/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ grade, detail }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (grade !== null) {
        onAddGrade({ subject: branchName, grade: grade, detail });
        setgrade(null);
        setdetail("");
      }
    } catch (error) {
      console.error("Error submitting grade:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 pl-5">Your {branchName} Grades</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full h-fit max-w-md space-y-6 p-6 rounded-lg"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Grade (1-6)
          </label>
          <input
            type="number"
            value={grade ?? ""}
            onChange={(e) => setgrade(Number(e.target.value))}
            className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
            min="1"
            max="6"
            step="0.5"
            placeholder="1-6"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Detail
          </label>
          <textarea
            value={detail}
            onChange={(e) => setdetail(e.target.value)}
            rows={2}
            className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"
            placeholder="Leave a comment..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-amber-600 text-white font-semibold rounded-md shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Add Grade
        </button>
      </form>
    </>
  );
};

export default AddGrade;
