import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { db } from "../firebase";
import { UserAuth } from "../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user, createUser, googleSignIn } = UserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await createUser(email, password);
            await setDoc(doc(db, "users", email), {
                times: [],
            });
        } catch (e) {
            setError(e.message);
            console.log(error);
        }
    };

    // If currently a user is signed in, redirect to dashboard page
    useEffect(() => {
        if (user != null) {
            navigate("/dashboard");
        }
    }, [user]);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-[700px] mx-auto my-16 p-4">
            <div>
                <h1 className="text-2xl font-bold py-2">
                    Signup an account with CCLAB
                </h1>
                <p className="py-2">
                    Already have an account?{"  "}
                    <Link to="/" className="underline">
                        Sign in.
                    </Link>
                </p>
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
                    <label className="py-2 font-medium">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-3"
                        type="password"
                    />
                </div>
                <button className="bg-gray-900 text-white hover:bg-gray-700 w-60 p-4 my-2">
                    Sign Up
                </button>
                <div className=" w-full">
                    <GoogleButton onClick={handleGoogleSignIn}></GoogleButton>
                </div>
            </form>
        </div>
    );
};

export default Signup;
