import { useState } from "react";

interface AddGradeFormProps {
    onAddGrade: (grade: { subject: string; value: number; comment: string }) => void;
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
        <form onSubmit={handleSubmit} className="w-1/3 space-y-4 bg-gray-100 p-4 rounded-xl shadow-md">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Note (1-6)
                </label>
                <input
                    type="number"
                    value={gradeValue ?? ""}
                    onChange={(e) => setGradeValue(Number(e.target.value))}
                    className="p-2 mt-1 block w-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    min="1"
                    max="6"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Detail
                </label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    rows={3}
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
                Add grade
            </button>
        </form>
    );
};

export default AddGrade;
