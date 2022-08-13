import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDoc, doc, Timestamp } from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import { useRef } from "react";

const AddSession = () => {
    const HOURLY_RATE = 15;
    const SUBMIT_BUTTON_TEXT_DEFAULT = "Book Session";
    const SUBMIT_BUTTON_TEXT_DISABLED = "Booking ...";
    const MESSAGES = {
        init: "Welcome to CCLAB session adding tool",
        submit: "Submitting session information ...",
        success: "Session added with ID: ",
    };

    const { user } = UserAuth();

    const [message, setMessage] = useState(MESSAGES.init);
    const [email, setEmail] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [sessionCode, setSessionCode] = useState("");
    const [researcher, setResearcher] = useState("");
    const [compensation, setCompensation] = useState(0);
    const [buttonText, setButtonText] = useState(SUBMIT_BUTTON_TEXT_DEFAULT);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const researcherRef = useRef(null);
    const compensationRef = useRef(null);

    // Client side form validation
    const validateForm = async () => {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        // disable button
        setButtonDisabled(true);
        setButtonText(SUBMIT_BUTTON_TEXT_DISABLED);
        setMessage(MESSAGES.submit);
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
            setMessage(`Session added with ID: ${docRef.id}`);
        } catch (error) {
            alert(error);
        } finally {
            setButtonDisabled(false);
            setButtonText(SUBMIT_BUTTON_TEXT_DEFAULT);
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
                    HOURLY_RATE;
                setCompensation(pay);
                compensationRef.current.value = compensation;
            }
        }
    }, [compensation, startTime, endTime]);

    return (
        <div className="max-w-[700px] mx-auto my-16 p-4">
            <div className="flex flex-col p-2 bg-slate-900 rounded-lg text-white">
                {message}
            </div>
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
                        className=" bg-gray-900 text-white w-60 p-4 my-2 hover:bg-gray-700 disabled:bg-gray-400"
                        disabled={buttonDisabled}
                    >
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSession;
