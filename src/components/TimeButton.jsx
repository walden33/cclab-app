import React, { useState } from "react";

const TimeButton = ({ id, isFree, toggleAvailbility }) => {
    const [free, setFree] = useState(isFree);

    const handleClick = async () => {
        await toggleAvailbility(id, free);
        setFree(!free);
    };

    return (
        <td
            className={`text-center border cursor-pointer border-slate-400 ${
                free
                    ? "bg-green-300 hover:bg-green-50"
                    : "bg-red-300 hover:bg-red-50"
            }`}
            id={id}
            onClick={handleClick}
        >
            {free ? "Yes" : "No"}
        </td>
    );
};

export default TimeButton;
