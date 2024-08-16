import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { isAuthenticated } from "./lib/context.ts";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Home from "./pages/Home.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;