import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import TimeButton from "./TimeButton";
import SessionRow from "./SessionRow";
import { getTimes, getTimeStringsIn12HFormat } from "../utils/util";

const Dashboard = () => {
    const DAYSOFWEEK = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const TIMES = getTimes();

    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [sessions, setSessions] = useState([]);

    // Load user name, age, and gender
    useEffect(() => {
        onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
            setName(doc.data()?.name);
            setAge(doc.data()?.age);
            setGender(doc.data()?.gender);
        });
    }, [user?.email]);

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
    }, [user?.email]);

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

    const toggleAvailbility = async (time) => {
        console.log(time);
    };

    return (
        <div className="max-w-[700px] mx-auto my-16 p-4">
            <h1 className="text-2xl font-bold py-4">Account</h1>
            <p>User Email: {user && user.email}</p>
            <p>User ID: {user && user.uid}</p>
            <p>Name: {user && name}</p>
            <p>Age: {user && age}</p>
            <p>Gender: {user && gender}</p>
            <button onClick={handleLogout} className="border px-6 py-2 my-4">
                Logout
            </button>
            <h1 className="text-2xl font-bold py-4">Availability</h1>
            <table className="table-fixed border-separate border border-slate-400">
                <thead>
                    <tr>
                        <th></th>
                        {DAYSOFWEEK.map((item, key) => (
                            <th key={key}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TIMES.map((time, timeKey) => (
                        <tr key={timeKey}>
                            <td>{getTimeStringsIn12HFormat(time)}</td>
                            {DAYSOFWEEK.map((d, dKey) => (
                                <TimeButton
                                    id={`${d}_${time}`}
                                    toggleAvailbility={toggleAvailbility}
                                ></TimeButton>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
