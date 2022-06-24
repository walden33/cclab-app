import React, { useState } from "react";
import { db } from "../firebase";
import { UserAuth } from "../contexts/AuthContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const TimeButton = (props) => {
    const [free, setFree] = useState(false);
    const { user } = UserAuth();

    const handleClick = async () => {
        if (user != null) {
            // if the current status is not free, add
            if (!free) {
                await updateDoc(doc(db, "users", user?.email), {
                    times: arrayUnion(props.id),
                });
            } else {
                // if the current status is free, remove
                await updateDoc(doc(db, "users", user?.email), {
                    times: arrayRemove(props.id),
                });
            }
            setFree(!free);
        } else {
            alert("Please login");
        }
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
};

export default TimeButton;
