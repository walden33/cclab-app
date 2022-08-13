import React from "react";
import Header from "./components/Header";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddSession from "./components/AddSession";
import SessionViewer from "./components/SessionViewer";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ForgetPassword from "./components/ForgetPassword";

function App() {
    return (
        <div className="App">
            <Header />
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Signin />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="reset" element={<ForgetPassword />}></Route>
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
                            <ProtectedRoute>
                                <SessionViewer />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route
                        path="/admin/sessions/add"
                        element={
                            <ProtectedRoute>
                                <AddSession />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
