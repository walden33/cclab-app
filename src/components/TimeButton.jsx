import React, { useState } from "react";

export default function TimeButton(props) {
    const [free, setFree] = useState(false);
    const handleClick = (e) => {
        props.updateFunction(e);
        setFree(!free);
    };
    return (
        <td
            className={"text-center border border-slate-400 ".concat(
                free ? "bg-green-300" : "bg-red-300"
            )}
            id={props.id}
            onClick={handleClick}
        >
            {free ? "Yes" : "No"}
        </td>
    );
}
