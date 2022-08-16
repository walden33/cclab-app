import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1
                className="text-center text-3xl font-bold my-5 cursor-pointer"
                onClick={() => {
                    navigate("/");
                }}
            >
                CCLAB
            </h1>
            <h2
                className="text-center text-xl font-thin underline cursor-pointer"
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
