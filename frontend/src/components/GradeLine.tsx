// @ts-ignore
import { GradeColor } from "./GradeColor.tsx";

interface GradeLineProps {
    grade: {
        subject: string;
        value: number;
        comment: string;
    };
}

const GradeLine: React.FC<GradeLineProps> = ({ grade }) => {
    return (
        <li className="p-4 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{grade.subject}</span>
                {/*// @ts-ignore */}
                <GradeColor grade={grade.value}>/6</GradeColor>
            </div>
            {grade.comment && <p className="text-gray-600 mt-2">{grade.comment}</p>}
        </li>
    );
};

export default GradeLine;