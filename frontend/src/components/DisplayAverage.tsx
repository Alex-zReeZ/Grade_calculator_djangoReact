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
        <span className="text-lg font-semibold p-5 py-3 border-2 bg-white rounded-2xl">
          {grades.length > 0 ? roundedAverage.toFixed(1) : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default DisplayAverage;