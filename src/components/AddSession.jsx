import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddSession = () => {
    const [email, setEmail] = useState("");
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [sessionCode, setSessionCode] = useState("");
    const [researcher, setResearcher] = useState("");
    const [compensation, setCompensation] = useState(0);
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
                        onChange={(e) => setCompensation(e.target.value)}
                        className="border p-3"
                        type="number"
                    />
                </div>
                <div className="flex flex-col py-2">
                    <button
                        onClick={handleSubmit}
                        className="border border-blue-500 bg-blue-600 hover:bg-blue-500 text-white w-60 p-4 my-2"
                    >
                        Book Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSession;
