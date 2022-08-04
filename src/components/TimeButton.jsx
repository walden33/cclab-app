import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { UserAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const TimeButton = ({ id, toggleAvailbility }) => {
    const [free, setFree] = useState(false);
    const { user } = UserAuth();

    const handleClick = async () => {
        await toggleAvailbility(id, free);
        setFree(!free);
    };

    // Get current availability status
    useEffect(() => {
        if (JSON.stringify(user) !== "{}") {
            // If current user is not empty (when user is not logged in or loaded)
            const getFreeTimes = async () => {
                const docRef = doc(db, "users", user?.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return docSnap.data()["times"];
                } else {
                    return [];
                }
            };
            getFreeTimes().then((data) => {
                if (data.includes(id)) {
                    setFree(true);
                }
            });
        }
    }, [user?.email]);

    return (
        <td
            className={"text-center border border-slate-400 ".concat(
                free
                    ? "bg-green-300 hover:bg-green-50"
                    : "bg-red-300 hover:bg-red-50"
            )}
            id={id}
            onClick={handleClick}
        >
            {free ? "Yes" : "No"}
        </td>
    );
};

export default TimeButton;
