import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import TimeButton from "./TimeButton";

const Dashboard = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const [demo, setDemo] = useState({});

    // useEffect(() => {
    //     onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
    //         setDemo(doc.data()?.demographic);
    //     });
    // }, [user?.email]);

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
            console.log("User logged out.");
        } catch (e) {
            console.log(e.message);
        }
    };

    // Handler of updating availability
    const handleUpdate = async (e) => {
        try {
            console.log(e.target.id);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="max-w-[600px] mx-auto my-16 p-4">
            <h1 className="text-2xl font-bold py-4">Account</h1>
            <p>User Email: {user && user.email}</p>
            <p>User ID: {user && user.uid}</p>
            <p>Name: {user && demo.firstName}</p>
            <p>Age: {user && demo.age}</p>
            <p>Gender: {user && demo.gender}</p>
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
                        <TimeButton
                            id="Mon_0700"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Tue_0700"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Wed_0700"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Thu_0700"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Fri_0700"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                    </tr>
                    <tr>
                        <td>07:30 AM</td>
                        <TimeButton
                            id="Mon_0730"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Tue_0730"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Wed_0730"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Thu_0730"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Fri_0730"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                    </tr>
                    <tr>
                        <td>08:00 AM</td>
                        <TimeButton
                            id="Mon_0800"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Tue_0800"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Wed_0800"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Thu_0800"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                        <TimeButton
                            id="Fri_0800"
                            updateFunction={handleUpdate}
                        ></TimeButton>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
