import React, { useState, useEffect } from "react";
import AdminSessionRow from "./AdminSessionRow";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const SessionViewer = () => {
    const [email, setEmail] = useState("");
    const [sessions, setSessions] = useState([]);

    /**
     * When the user enters a potential participant email, query the database
     * for all the open sessions and set sessions array to the query results.
     * Use a timeout to reduce unnecessary query operations when typing.
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (email.length > 0) {
                getDocs(
                    query(
                        collection(db, "sessions"),
                        where("subId", "==", email)
                    )
                ).then((snapshot) => {
                    const sessionArray = [];
                    snapshot.forEach((doc) => {
                        sessionArray.push({ id: doc.id, data: doc.data() });
                    });
                    setSessions(sessionArray);
                });
            }
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [email]);
    return (
        <div className="max-w-[900px] mx-auto my-16 p-4">
            <div className="flex flex-col py-2">
                <label className="py-2 font-medium">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3"
                    type="email"
                />
            </div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.map(
                                        (session) =>
                                            session.data.status === "open" && (
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
                                                    key={session.id}
                                                    id={session.id}
                                                />
                                            )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionViewer;
