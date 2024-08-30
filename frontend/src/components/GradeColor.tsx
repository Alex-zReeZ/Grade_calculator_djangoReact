export function GradeColor({ grade }) {
  let color;
  if (grade === 0) {
    color = "#000000";
  } else if (grade > 4.5) {
    color = "#32de84";
  } else if (grade < 4) {
    color = "#AA0000";
  } else if (grade < 1) {
    color = "#000000";
  } else {
    color = "#FEBE10";
  }

  return grade === 0 ? (
    "No Grade Yet"
  ) : (
    <span
      className="w-fit text-lg font-semibold p-5 py-3 border-2 bg-white rounded-2xl"
      style={{ color: color, borderColor: color }}
    >
      {grade}
    </span>
  );
}
