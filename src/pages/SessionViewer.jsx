import React, { useState, useEffect } from "react";
import AdminSessionRow from "../components/Session/AdminSessionRow";
import { db } from "../firebase";
import {
    getDocs,
    collection,
    query,
    where,
    doc,
    updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SessionViewer = () => {
    const [email, setEmail] = useState("");
    const [sessions, setSessions] = useState([]);
    const [message, setMessage] = useState("");
    // A state variable used to trigger re-render of session list
    const [numberOfSessionStatusChange, setNumberofSessionStatusChange] =
        useState(0);
    const navigate = useNavigate();

    /**
     * When the user enters a potential participant email, query the database
     * for all the open sessions and set sessions array to the query results.
     * Use a timeout to reduce unnecessary query operations when typing.
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (email.length > 0) {
                setMessage("Searching ...");
                getDocs(
                    query(
                        collection(db, "sessions"),
                        where("subId", "==", email)
                    )
                )
                    .then((snapshot) => {
                        const sessionArray = [];
                        snapshot.forEach((doc) => {
                            sessionArray.push({ id: doc.id, data: doc.data() });
                        });
                        setSessions(sessionArray);
                        setMessage("Query completed.");
                    })
                    .catch((error) => {
                        setMessage(error);
                    });
            }
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [email, numberOfSessionStatusChange]);

    const handleComplete = async (id) => {
        setMessage(`Setting session status to completed ...`);
        try {
            await updateDoc(doc(db, "sessions", id), { status: "completed" });
        } catch (error) {
            setMessage(error);
        } finally {
            setMessage(
                `Successfully marked session as completed with id: ${id}`
            );
            setNumberofSessionStatusChange((prev) => prev + 1);
        }
    };

    const handleRemove = async (id) => {
        setMessage(`Deleting session ...`);
        try {
            await updateDoc(doc(db, "sessions", id), { status: "deleted" });
        } catch (error) {
            setMessage(error);
        } finally {
            setMessage(`Successfully deleted session with id: ${id}`);
            setNumberofSessionStatusChange((prev) => prev + 1);
        }
    };

    const handleAddNewSession = () => {
        navigate("./add");
    };

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
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Session Code
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Time Start
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Time End
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Researcher
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Compensation
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.map(
                                        (session) =>
                                            session.data.status !==
                                                "deleted" && (
                                                <AdminSessionRow
                                                    code={
                                                        session.data.sessionCode
                                                    }
                                                    start={session.data.startTime
                                                        .toDate()
                                                        .toLocaleString(
                                                            "en-US"
                                                        )}
                                                    end={session.data.endTime
                                                        .toDate()
                                                        .toLocaleString(
                                                            "en-US"
                                                        )}
                                                    ra={session.data.ra}
                                                    compensation={
                                                        session.data
                                                            .compensation
                                                    }
                                                    status={session.data.status}
                                                    key={session.id}
                                                    id={session.id}
                                                    handleComplete={
                                                        handleComplete
                                                    }
                                                    handleRemove={handleRemove}
                                                />
                                            )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="py-2 inline-block text-right min-w-full sm:px-6 lg:px-8">
                        <button
                            className="p-2 border bg-gray-900 text-white hover:bg-gray-700"
                            onClick={handleAddNewSession}
                        >
                            Add New Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionViewer;
