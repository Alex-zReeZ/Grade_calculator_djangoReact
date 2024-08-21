// @ts-ignore
import { GradeColor } from "./GradeColor.tsx";

interface GradeLineProps {
    grade: {
        subject: string;
        value: number;
        comment: string;
    };
    index: number;
}

const GradeLine: React.FC<GradeLineProps> = ({ grade, index }) => {
    return (
        <li className="w-full p-4 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center">
                <span className="font-bold p-5">{index}.</span>
                {/*// @ts-ignore */}
                <GradeColor grade={grade.value}>/6</GradeColor>
            </div>
            <div className="mt-3">
                <span className="text-gray-400 text-sm">Detail:</span>
                {grade.comment && <p className="text-gray-600">{grade.comment}</p>}
            </div>
        </li>
    );
};

export default GradeLine;