export function GradeColor({ grade }) {
    let color;
    if (grade > 4.5) {
        color = "#32de84";
    } else if (grade < 4) {
        color = "#AA0000";
    } else {
        color = "#FEBE10";
    }
    return (
        <span className="text-lg font-semibold text-blue-600 p-5 py-3 border-2 rounded-2xl" style={{ color: color }}>{grade}</span>
    );
}