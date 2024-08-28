import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/grades/${branchName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    <form
      onSubmit={handleSubmit}
      className="w-full h-fit max-w-md space-y-6 bg-white p-6 rounded-lg shadow-2xl"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Grade (1-6)
        </label>
        <input
          type="number"
          value={grade ?? ""}
          onChange={(e) => setgrade(Number(e.target.value))}
          className="mt-2 block w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition sm:text-sm"
          min="1"
          max="6"
          step="0.5"
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
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition sm:text-sm"
          rows={2}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        Add Grade
      </button>
    </form>
  );
};

export default AddGrade;
