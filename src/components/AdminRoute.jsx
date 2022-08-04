import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        // if no user is logged in, return to root
        return <Navigate to="/" />;
    }
    // if (!user.isAdmin) {
    //     // if no user is not admin, return to root
    //     return <Navigate to="/" />;
    // }
    return children;
};

export default AdminRoute;
