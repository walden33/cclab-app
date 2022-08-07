import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDoc, doc, Timestamp } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import { useRef } from "react";

const AddSession = () => {
    const HOURLYRATE = 15;

    const { user } = UserAuth();

    const [email, setEmail] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [sessionCode, setSessionCode] = useState("");
    const [researcher, setResearcher] = useState("");
    const [compensation, setCompensation] = useState(0);

    const researcherRef = useRef(null);
    const compensationRef = useRef(null);

    // Client side form validation
    const validateForm = async () => {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "sessions"), {
                subId: email,
                sessionCode: sessionCode,
                researcher: researcher,
                startTime: Timestamp.fromDate(new Date(startTime)),
                endTime: Timestamp.fromDate(new Date(endTime)),
                compensation: compensation,
                status: "open",
            });
        } catch (error) {
            alert(error);
        }
    };

    // Auto fill researcher's name
    useEffect(() => {
        if (JSON.stringify(user) !== "{}") {
            getDoc(doc(db, "admins", user.email)).then((docSnap) => {
                setResearcher(docSnap.data().name);
                researcherRef.current.value = researcher;
            });
        }
    });

    // Calculate compensation
    useEffect(() => {
        if (startTime !== null && endTime !== null) {
            let pay;
            const startTimeInMilliseconds = new Date(startTime).getTime();
            const endTimeInMilliseconds = new Date(endTime).getTime();
            if (endTime > startTime) {
                pay =
                    ((endTimeInMilliseconds - startTimeInMilliseconds) /
                        1000 /
                        3600) *
                    HOURLYRATE;
                setCompensation(pay);
                compensationRef.current.value = compensation;
            }
        }
    }, [startTime, endTime]);

    return (
        <div className="max-w-[700px] mx-auto my-16 p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Participant ID</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-3"
                        type="email"
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Session Code</label>
                    <input
                        onChange={(e) => setSessionCode(e.target.value)}
                        className="border p-3"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Researcher Name</label>
                    <input
                        ref={researcherRef}
                        onChange={(e) => setResearcher(e.target.value)}
                        className="border p-3"
                        type="text"
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Start Time</label>
                    <input
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border p-3"
                        type="datetime-local"
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">End Time</label>
                    <input
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border p-3"
                        type="datetime-local"
                    />
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Compensation</label>
                    <input
                        ref={compensationRef}
                        onChange={(e) => setCompensation(e.target.value)}
                        className="border p-3"
                        type="number"
                    />
                </div>
                <div className="flex flex-col py-2">
                    <button
                        onClick={handleSubmit}
                        className=" bg-gray-900 text-white hover:bg-gray-700 w-60 p-4 my-2"
                    >
                        Book Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSession;
