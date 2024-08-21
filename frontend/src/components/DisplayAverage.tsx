interface DisplayAverageProps {
  grades: { value: number }[];
}

const DisplayAverage: React.FC<DisplayAverageProps> = ({ grades }) => {
  return (
    <div className="">
      <h2 className="text-xl font-semibold mt-6">Moyenne:</h2>
      <div className="flex items-center space-x-4 mt-2">
        <span className="text-lg font-semibold p-5 py-3 border-2 bg-white rounded-2xl">
          {grades.length > 0
            ? (grades.reduce((acc, grade) => acc + grade.value, 0) / grades.length).toFixed(1)
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default DisplayAverage;