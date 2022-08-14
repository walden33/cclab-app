import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
    setDoc,
    getDocs,
    doc,
    Timestamp,
    collection,
} from "firebase/firestore";
import { UserAuth } from "../contexts/AuthContext";
import axios from "axios";
import {
    CALENDAR_IDS,
    CALENDAR_EVENT_API_URL,
    LOCATION,
    TIMEZONE,
} from "../utils/consts";

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
    const [errorExist, setErrorExist] = useState(false);
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [sessionCode, setSessionCode] = useState("");
    const [researcher, setResearcher] = useState("");
    const [researcherList, setResearcherList] = useState([]);
    const [compensation, setCompensation] = useState(0);
    const [buttonText, setButtonText] = useState(SUBMIT_BUTTON_TEXT_DEFAULT);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const researcherRef = useRef(null);
    const compensationRef = useRef(null);

    // Helper function to create event summary for google calendar
    // Format: Session Code - Researcher
    const createEventSummary = () => {
        return `${sessionCode} - ${researcher.split(" ")[0]}`;
    };

    // Helper function to format dateTime string
    // such that the second 00 is appended to the YYYY-MM-DDTHH-MM string
    const formatDateTimeForGoogleCalendarAPICall = (str) => `${str}:00`;

    // Client side form validation
    const validateForm = async () => {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        // disable button
        setButtonDisabled(true);
        setButtonText(SUBMIT_BUTTON_TEXT_DISABLED);
        setMessage(MESSAGES.submit);
        try {
            // create Google Calendar event
            const postData = {
                summary: createEventSummary(),
                location: LOCATION,
                description: createEventSummary(),
                start: {
                    dateTime: formatDateTimeForGoogleCalendarAPICall(startTime),
                    timeZone: TIMEZONE,
                },
                end: {
                    dateTime: formatDateTimeForGoogleCalendarAPICall(endTime),
                    timeZone: TIMEZONE,
                },
            };
            const resp = await axios.post(
                `${CALENDAR_EVENT_API_URL}?calendarId=${CALENDAR_IDS[room]}`,
                postData
            );
            const eventId = resp.data?.id;
            setMessage(`Calendar event added with ID: ${eventId}`);

            // create Firebase entry
            await setDoc(doc(db, "sessions", eventId), {
                subId: email,
                sessionCode: sessionCode,
                room: room,
                researcher: researcher,
                startTime: Timestamp.fromDate(new Date(startTime)),
                endTime: Timestamp.fromDate(new Date(endTime)),
                compensation: compensation,
                status: "open",
            });
            setMessage(`Session added with ID: ${eventId}`);
        } catch (error) {
            setErrorExist(true);
            setMessage(String(error));
        } finally {
            setButtonDisabled(false);
            setButtonText(SUBMIT_BUTTON_TEXT_DEFAULT);
        }
    };

    // Load researcher names
    useEffect(() => {
        let list = [];
        getDocs(collection(db, "admins")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                list.push(doc.data());
            });
        });
        setResearcherList(list);
    }, [user]);

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
            <div
                className={`flex flex-col p-2 rounded-lg text-white ${
                    errorExist ? "bg-red-700" : "bg-slate-900"
                }`}
            >
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
                    <label className="py-2 font-medium">Room</label>
                    <select
                        className="border p-3"
                        onChange={(e) => {
                            setRoom(e.target.value);
                        }}
                    >
                        <option value="RM1">Room 1</option>
                        <option value="RM2">Room 2</option>
                        <option value="RM3">Room 3</option>
                        <option value="RM221E">Room 221e</option>
                        <option value="FMRI">fMRI</option>
                    </select>
                </div>
                <div className="flex flex-col py-2">
                    <label className="py-2 font-medium">Researcher Name</label>
                    <input
                        ref={researcherRef}
                        onChange={(e) => setResearcher(e.target.value)}
                        className="border p-3"
                        type="text"
                        list="researchers"
                    />
                    <datalist id="researchers">
                        {researcherList.map((data) => (
                            <option value={data.name} key={data.id}></option>
                        ))}
                    </datalist>
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
