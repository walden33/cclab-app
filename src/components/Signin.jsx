import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const { user, signIn, googleSignIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signIn(email, password);
            navigate("/dashboard");
        } catch (e) {
            setError(e.message);
            setMessage(
                "Either the email or password does not match our record"
            );
            console.log(error);
        }
    };

    // If currently a user is signed in, redirect to dashboard page
    useEffect(() => {
        if (user != null) {
            // getUserIsAdmin().then((isAdmin) => console.log(isAdmin));
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
                    Sign in to your account
                </h1>
                <p className="py-2">
                    Don't have an account yet?{"  "}
                    <Link to="/signup" className="underline">
                        Sign up.
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
                <div className="flex flex-col py-2">
                    <p className="text-red-500">{message}</p>
                </div>
                <div className="flex flex-col py-2">
                    <button className="bg-gray-900 text-white hover:bg-gray-700 w-60 p-4 my-2">
                        Sign In
                    </button>
                    <div className=" w-full">
                        <GoogleButton
                            onClick={handleGoogleSignIn}
                        ></GoogleButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signin;
