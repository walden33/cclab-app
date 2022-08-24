import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import TableHeader from "../components/tables/TableHeader";
import ParticipantRow from "../components/participant/ParticipantRow";

const UserViewer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [userList, setUserList] = useState([]);

    const headerLabels = ["Email", "Availability"];

    const handleCheckAvailability = (email) => {
        window.open(`timetable/${email}`);
    };

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
    }, []);

    return (
        <div className="max-w-[1080px] mx-auto my-16 p-4">
            {/* <div className="flex flex-col py-2">
                <label className="py-2 font-medium">Participant ID</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3"
                    type="email"
                />
            </div> */}
            <div className="flex flex-col py-2">{message}</div>
            <table className="min-w-full">
                <TableHeader labels={headerLabels} />
                <tbody>
                    {userList.map((userEmail, i) => (
                        <ParticipantRow
                            key={i}
                            email={userEmail}
                            handleCheckAvailability={handleCheckAvailability}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserViewer;
