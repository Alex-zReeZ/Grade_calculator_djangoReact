// @ts-ignore
import {GradeColor} from "./GradeColor.tsx";

interface DisplayAverageProps {
  grades: { grade: number }[];
  module: boolean;
}

const DisplayAverage: React.FC<DisplayAverageProps> = ({ grades, module }) => {
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
          <GradeColor grade={roundedAverage} />
      </div>
    </div>
  );
};

export default DisplayAverage;
