export function isAuthenticated() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return !!token;
}

export function getToken() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("Token not found");
  }

  return token;
}

export function getBranches() {
  const token = getToken();

  return fetch("http://localhost:8000/branches/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid token");
      }
      return response.json();
    })
    .then((data) =>
      data.map((branch) => ({ id: branch.id, name: branch.name })),
    );
}
