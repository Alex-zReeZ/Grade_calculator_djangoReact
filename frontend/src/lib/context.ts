export function isAuthenticated() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return !!token;
}

export const getAllBranches = () => {
  return [
    "Maths",
    "French",
    "English",
    "German",
    "Science",
    "Maths DC",
    "Histoire",
    "Economics and Law",
    "Module",
    "TIP",
  ];
};
