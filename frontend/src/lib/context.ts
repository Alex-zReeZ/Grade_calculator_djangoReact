export function isAuthenticated() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return !!token;
}

export function getBranches() {
  return fetch("http://localhost:8000/branches/")
    .then((response) => response.json())
    .then((data) => data.map((branch) => ({ id: branch.id, name: branch.name })));
}
