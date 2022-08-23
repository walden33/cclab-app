import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    getDocs,
    collection,
    query,
    where,
    doc,
    updateDoc,
} from "firebase/firestore";

const UserViewer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getDocs(collection(db, "users"))
            .then((snap) =>
                snap.forEach((doc) =>
                    setUserList((oldUserList) => [...oldUserList, doc.id])
                )
            )
            .catch((error) => {
                alert(error);
            });
    }, [email]);

    console.log(userList);

    return (
        <div className="max-w-[1080px] mx-auto my-16 p-4">
            <div className="flex flex-col py-2">
                <label className="py-2 font-medium">Participant ID</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3"
                    type="email"
                />
            </div>
            <div className="flex flex-col py-2">{message}</div>
        </div>
    );
};

export default UserViewer;
