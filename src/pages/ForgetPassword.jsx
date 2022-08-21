import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const resetPassword = (email) => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetPassword(email);
    };

    // If currently a user is signed in, redirect to dashboard page
    // useEffect(() => {
    //     if (user != null) {
    //         // getUserIsAdmin().then((isAdmin) => console.log(isAdmin));
    //         navigate("/dashboard");
    //     }
    // }, [user]);

    return (
        <div className="max-w-[700px] mx-auto my-16 p-4">
            <div>
                <h1 className="text-2xl font-bold py-2">Reset Your Password</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-3"
                        type="email"
                    />
                </div>

                <div className="flex flex-col py-2">
                    <button className="bg-gray-900 text-white hover:bg-gray-700 w-60 p-4 my-2">
                        Send Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;
