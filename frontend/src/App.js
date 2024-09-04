import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { getBranches, isAuthenticated } from "./lib/context.ts";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Home from "./pages/Home.tsx";
import Grades from "./template/Grades.tsx";

const App = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      const branches = await getBranches();
      setLinks(branches.map(branch => branch.name));
    };

    fetchBranches();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {links.map((link) => (
          <Route
            key={link}
            path={`/${link}`}
            element={
              <Grades
                branchName={link}
                fetchUrl={`http://localhost:8000/grades/${link}/get_grades_by_branch/`}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;