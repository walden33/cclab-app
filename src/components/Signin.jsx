import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../contexts/AuthContext";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
            console.log(error);
        }
    };

    // Users don't need to be here if they are already signed in.
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
                    <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 text-white w-60 p-4 my-2">
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
