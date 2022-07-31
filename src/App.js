import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ResearcherDashboard from "./components/ResearcherDashboard";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="App">
            <h1 className="text-center text-3xl font-bold my-10">CCLab</h1>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Signin />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/researcher/dashboard"
                        element={
                            <ProtectedRoute>
                                <ResearcherDashboard />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
