import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8000/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        window.location.href = "/";
      }
      const data = await response.json();
      if (data.token) {
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24}`;
        console.log("Login successful, token stored in cookies");
      } else {
        setError(
          "Une erreur s'est produite. Veuillez vérifier les informations entrées.",
        );
        console.error("Login failed, no token received");
      }
      console.log(data);
    } catch (error) {
      setError(
        "Une erreur s'est produite. Veuillez vérifier les informations entrées.",
      );
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        {error && (
          <div className="rounded-md bg-red-200 p-4 mb-6">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#f87171"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="ml-3 text-sm font-medium text-red-500">
                An error occurred. Please check the entered information.
              </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <a
              href="/signup"
              className="text-sm text-amber-500 hover:underline transition duration-300"
            >
              No account yet? Sign up
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition duration-300"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
