import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { UserAuth } from "../contexts/AuthContext";
import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    collection,
    getDoc,
    getDocs,
} from "firebase/firestore";

const TimeButton = (props) => {
    const [free, setFree] = useState(false);
    const { user } = UserAuth();

    const handleClick = async () => {
        if (JSON.stringify(user) !== "{}") {
            // if the current status is not free, add
            if (!free) {
                await updateDoc(doc(db, "users", user.email), {
                    times: arrayUnion(props.id),
                });
            } else {
                // if the current status is free, remove
                await updateDoc(doc(db, "users", user.email), {
                    times: arrayRemove(props.id),
                });
            }
            setFree(!free);
        } else {
            alert("Please login");
        }
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
                if (data.includes(props.id)) {
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
            id={props.id}
            onClick={handleClick}
        >
            {free ? "Yes" : "No"}
        </td>
    );
};

export default TimeButton;
