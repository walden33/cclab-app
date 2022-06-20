import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const Dashboard = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
            console.log("User logged out.");
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="max-w-[600px] mx-auto my-16 p-4">
            <h1 className="text-2xl font-bold py-4">Account</h1>
            <p>User Email: {user && user.email}</p>
            <p>User ID: {user && user.uid}</p>
            <button onClick={handleLogout} className="border px-6 py-2 my-4">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
