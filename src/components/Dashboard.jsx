import React, { useEffect, useState, Suspense } from "react";
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

const Dashboard = () => {
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

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
            console.log("User logged out.");
        } catch (e) {
            console.log(e.message);
        }
    };

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

    return (
        <div className="max-w-[600px] mx-auto my-16 p-4">
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
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>07:00 AM</td>
                        <TimeButton id="Mon_0700"></TimeButton>
                        <TimeButton id="Tue_0700"></TimeButton>
                        <TimeButton id="Wed_0700"></TimeButton>
                        <TimeButton id="Thu_0700"></TimeButton>
                        <TimeButton id="Fri_0700"></TimeButton>
                    </tr>
                    <tr>
                        <td>07:30 AM</td>
                        <TimeButton id="Mon_0730"></TimeButton>
                        <TimeButton id="Tue_0730"></TimeButton>
                        <TimeButton id="Wed_0730"></TimeButton>
                        <TimeButton id="Thu_0730"></TimeButton>
                        <TimeButton id="Fri_0730"></TimeButton>
                    </tr>
                    <tr>
                        <td>08:00 AM</td>
                        <TimeButton id="Mon_0800"></TimeButton>
                        <TimeButton id="Tue_0800"></TimeButton>
                        <TimeButton id="Wed_0800"></TimeButton>
                        <TimeButton id="Thu_0800"></TimeButton>
                        <TimeButton id="Fri_0800"></TimeButton>
                    </tr>
                    <tr>
                        <td>08:30 AM</td>
                        <TimeButton id="Mon_0830"></TimeButton>
                        <TimeButton id="Tue_0830"></TimeButton>
                        <TimeButton id="Wed_0830"></TimeButton>
                        <TimeButton id="Thu_0830"></TimeButton>
                        <TimeButton id="Fri_0830"></TimeButton>
                    </tr>
                    <tr>
                        <td>09:00 AM</td>
                        <TimeButton id="Mon_0900"></TimeButton>
                        <TimeButton id="Tue_0900"></TimeButton>
                        <TimeButton id="Wed_0900"></TimeButton>
                        <TimeButton id="Thu_0900"></TimeButton>
                        <TimeButton id="Fri_0900"></TimeButton>
                    </tr>
                    <tr>
                        <td>09:30 AM</td>
                        <TimeButton id="Mon_0930"></TimeButton>
                        <TimeButton id="Tue_0930"></TimeButton>
                        <TimeButton id="Wed_0930"></TimeButton>
                        <TimeButton id="Thu_0930"></TimeButton>
                        <TimeButton id="Fri_0930"></TimeButton>
                    </tr>
                    <tr>
                        <td>10:00 AM</td>
                        <TimeButton id="Mon_1000"></TimeButton>
                        <TimeButton id="Tue_1000"></TimeButton>
                        <TimeButton id="Wed_1000"></TimeButton>
                        <TimeButton id="Thu_1000"></TimeButton>
                        <TimeButton id="Fri_1000"></TimeButton>
                    </tr>
                    <tr>
                        <td>10:30 AM</td>
                        <TimeButton id="Mon_1030"></TimeButton>
                        <TimeButton id="Tue_1030"></TimeButton>
                        <TimeButton id="Wed_1030"></TimeButton>
                        <TimeButton id="Thu_1030"></TimeButton>
                        <TimeButton id="Fri_1030"></TimeButton>
                    </tr>
                    <tr>
                        <td>11:00 AM</td>
                        <TimeButton id="Mon_1100"></TimeButton>
                        <TimeButton id="Tue_1100"></TimeButton>
                        <TimeButton id="Wed_1100"></TimeButton>
                        <TimeButton id="Thu_1100"></TimeButton>
                        <TimeButton id="Fri_1100"></TimeButton>
                    </tr>
                    <tr>
                        <td>11:30 AM</td>
                        <TimeButton id="Mon_1130"></TimeButton>
                        <TimeButton id="Tue_1130"></TimeButton>
                        <TimeButton id="Wed_1130"></TimeButton>
                        <TimeButton id="Thu_1130"></TimeButton>
                        <TimeButton id="Fri_1130"></TimeButton>
                    </tr>
                    <tr>
                        <td>12:00 PM</td>
                        <TimeButton id="Mon_1200"></TimeButton>
                        <TimeButton id="Tue_1200"></TimeButton>
                        <TimeButton id="Wed_1200"></TimeButton>
                        <TimeButton id="Thu_1200"></TimeButton>
                        <TimeButton id="Fri_1200"></TimeButton>
                    </tr>
                    <tr>
                        <td>12:30 PM</td>
                        <TimeButton id="Mon_1230"></TimeButton>
                        <TimeButton id="Tue_1230"></TimeButton>
                        <TimeButton id="Wed_1230"></TimeButton>
                        <TimeButton id="Thu_1230"></TimeButton>
                        <TimeButton id="Fri_1230"></TimeButton>
                    </tr>
                    <tr>
                        <td>1:00 PM</td>
                        <TimeButton id="Mon_1300"></TimeButton>
                        <TimeButton id="Tue_1300"></TimeButton>
                        <TimeButton id="Wed_1300"></TimeButton>
                        <TimeButton id="Thu_1300"></TimeButton>
                        <TimeButton id="Fri_1300"></TimeButton>
                    </tr>
                    <tr>
                        <td>1:30 PM</td>
                        <TimeButton id="Mon_1330"></TimeButton>
                        <TimeButton id="Tue_1330"></TimeButton>
                        <TimeButton id="Wed_1330"></TimeButton>
                        <TimeButton id="Thu_1330"></TimeButton>
                        <TimeButton id="Fri_1330"></TimeButton>
                    </tr>
                    <tr>
                        <td>2:00 PM</td>
                        <TimeButton id="Mon_1400"></TimeButton>
                        <TimeButton id="Tue_1400"></TimeButton>
                        <TimeButton id="Wed_1400"></TimeButton>
                        <TimeButton id="Thu_1400"></TimeButton>
                        <TimeButton id="Fri_1400"></TimeButton>
                    </tr>
                    <tr>
                        <td>2:30 PM</td>
                        <TimeButton id="Mon_1430"></TimeButton>
                        <TimeButton id="Tue_1430"></TimeButton>
                        <TimeButton id="Wed_1430"></TimeButton>
                        <TimeButton id="Thu_1430"></TimeButton>
                        <TimeButton id="Fri_1430"></TimeButton>
                    </tr>
                    <tr>
                        <td>3:00 PM</td>
                        <TimeButton id="Mon_1500"></TimeButton>
                        <TimeButton id="Tue_1500"></TimeButton>
                        <TimeButton id="Wed_1500"></TimeButton>
                        <TimeButton id="Thu_1500"></TimeButton>
                        <TimeButton id="Fri_1500"></TimeButton>
                    </tr>
                    <tr>
                        <td>3:30 PM</td>
                        <TimeButton id="Mon_1530"></TimeButton>
                        <TimeButton id="Tue_1530"></TimeButton>
                        <TimeButton id="Wed_1530"></TimeButton>
                        <TimeButton id="Thu_1530"></TimeButton>
                        <TimeButton id="Fri_1530"></TimeButton>
                    </tr>
                    <tr>
                        <td>4:00 PM</td>
                        <TimeButton id="Mon_1600"></TimeButton>
                        <TimeButton id="Tue_1600"></TimeButton>
                        <TimeButton id="Wed_1600"></TimeButton>
                        <TimeButton id="Thu_1600"></TimeButton>
                        <TimeButton id="Fri_1600"></TimeButton>
                    </tr>
                    <tr>
                        <td>4:30 PM</td>
                        <TimeButton id="Mon_1630"></TimeButton>
                        <TimeButton id="Tue_1630"></TimeButton>
                        <TimeButton id="Wed_1630"></TimeButton>
                        <TimeButton id="Thu_1630"></TimeButton>
                        <TimeButton id="Fri_1630"></TimeButton>
                    </tr>
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
