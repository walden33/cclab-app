import React, { useState } from "react";

export default function TimeButton(props) {
    const [free, setFree] = useState();
    return (
        <td
            className="text-center border border-slate-400"
            id={props.id}
            onClick={props.updateFunction}
        >
            {free ? "Yes" : "No"}
        </td>
    );
}
