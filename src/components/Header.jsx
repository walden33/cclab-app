import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1
                className="text-center text-3xl font-bold my-5"
                onClick={() => {
                    navigate("/");
                }}
            >
                CCLAB
            </h1>
            <h2
                className="text-center text-xl font-thin underline"
                onClick={() => {
                    navigate("/");
                }}
            >
                Studies Worth Participating
            </h2>
        </div>
    );
};

export default Header;
