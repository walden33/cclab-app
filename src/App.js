import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddSession from "./components/AddSession";
import SessionViewer from "./components/SessionViewer";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

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
                        path="/admin/sessions"
                        element={
                            <AdminRoute>
                                <SessionViewer />
                            </AdminRoute>
                        }
                    ></Route>
                    <Route
                        path="/admin/sessions/add"
                        element={
                            <AdminRoute>
                                <AddSession />
                            </AdminRoute>
                        }
                    ></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
