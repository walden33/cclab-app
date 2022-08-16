import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
    doc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    arrayRemove,
    getDoc,
} from "firebase/firestore";
import SessionRow from "./SessionRow";
import TimeTable from "./TimeTable";

const Dashboard = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const [freeTimes, setFreeTimes] = useState([]);
    const [sessions, setSessions] = useState([]);

    // Get free time blocks for current user
    useEffect(() => {
        if (JSON.stringify(user) !== "{}") {
            getDoc(doc(db, "users", user.email)).then((docSnap) => {
                if (docSnap.exists()) {
                    setFreeTimes(docSnap.data()["times"]);
                }
            });
        }
    }, [user]);

    // Get registered session for current user
    useEffect(() => {
        if (JSON.stringify(user) !== "{}") {
            getDocs(
                query(
                    collection(db, "sessions"),
                    where("subId", "==", user.email)
                )
            ).then((snapshot) => {
                const sessionArray = [];
                snapshot.forEach((doc) => {
                    sessionArray.push(doc.data());
                });
                setSessions(sessionArray);
            });
        }
    }, [user]);

    // event handlers
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
            console.log("User logged out.");
        } catch (e) {
            console.log(e.message);
        }
    };

    // Callback that passes down to <TimeButton>s that updates database for available times of an user
    const toggleAvailbility = async (time, previousState) => {
        // if the previous state is not free, add this time window to array
        if (previousState === false) {
            await updateDoc(doc(db, "users", user.email), {
                times: arrayUnion(time),
            });
        } else {
            // if the previous state is free, remove this time window from array
            await updateDoc(doc(db, "users", user.email), {
                times: arrayRemove(time),
            });
        }
    };

    return (
        <div className="max-w-[700px] mx-auto my-16 p-4">
            <h1 className="text-2xl font-bold py-4">Account</h1>
            <p>User Email: {user && user.email}</p>
            <p>User ID: {user && user.uid}</p>
            <button onClick={handleLogout} className="border px-6 py-2 my-4">
                Logout
            </button>
            <h1 className="text-2xl font-bold py-4">Availability</h1>
            <p>
                Please toggle your availability for each time frame in a typical
                working week. One of our team members will reach out to you
                regarding the next steps of your participation!
            </p>
            <TimeTable
                freeTimes={freeTimes}
                toggleAvailbility={toggleAvailbility}
            />
            <h1 className="text-2xl font-bold py-4">Registered Sessions</h1>
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
                                        (item, key) =>
                                            item.status === "open" && (
                                                <SessionRow
                                                    code={item.sessionCode}
                                                    start={item.startTime
                                                        .toDate()
                                                        .toLocaleString(
                                                            "en-US"
                                                        )}
                                                    end={item.endTime
                                                        .toDate()
                                                        .toLocaleString(
                                                            "en-US"
                                                        )}
                                                    ra={item.ra}
                                                    compensation={
                                                        item.compensation
                                                    }
                                                    key={key}
                                                />
                                            )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-2xl font-bold py-4">Completed Sessions</h1>
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
                                        (item, key) =>
                                            item.status === "complete" && (
                                                <SessionRow
                                                    code={item.sessionCode}
                                                    start={item.startTime
                                                        .toDate()
                                                        .toLocaleString(
                                                            "en-US"
                                                        )}
                                                    end={item.endTime
                                                        .toDate()
                                                        .toLocaleString(
                                                            "en-US"
                                                        )}
                                                    ra={item.ra}
                                                    compensation={
                                                        item.compensation
                                                    }
                                                    key={key}
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

export default Dashboard;
