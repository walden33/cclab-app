import React from "react";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddSession from "./pages/AddSession";
import SessionViewer from "./pages/SessionViewer";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/ForgetPassword";
import UserViewer from "./pages/UserViewer";

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
                    <Route
                        path="/admin/participants"
                        element={
                            <ProtectedRoute>
                                <UserViewer />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
