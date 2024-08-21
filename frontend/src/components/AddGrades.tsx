import { useState } from "react";

interface AddGradeFormProps {
  onAddGrade: (grade: {
    subject: string;
    value: number;
    comment: string;
  }) => void;
  branchName: string;
}

const AddGrade: React.FC<AddGradeFormProps> = ({ onAddGrade, branchName }) => {
  const [gradeValue, setGradeValue] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gradeValue !== null) {
      onAddGrade({ subject: branchName, value: gradeValue, comment });
      setGradeValue(null);
      setComment("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-fit max-w-md space-y-6 bg-white p-6 rounded-lg shadow-2xl"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Note (1-6)
        </label>
        <input
          type="number"
          value={gradeValue ?? ""}
          onChange={(e) => setGradeValue(Number(e.target.value))}
          className="mt-2 block w-16 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition sm:text-sm"
          min="1"
          max="6"
          step="0.5"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Détail
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition sm:text-sm"
          rows={2}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        Ajouter la note
      </button>
    </form>
  );
};

export default AddGrade;
