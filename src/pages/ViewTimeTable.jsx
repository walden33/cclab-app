import React, { useState, useEffect } from "react";
import TimeTable from "../components/TimeTable/TimeTable";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ViewTimeTable = () => {
    const { id } = useParams();
    const [freeTimes, setFreeTimes] = useState([]);

    // Get free times
    useEffect(() => {
        if (id.length > 0) {
            getDoc(doc(db, "users", id)).then((docSnap) => {
                setFreeTimes(docSnap.data()["times"]);
            });
        }
    }, [id]);

    return (
        <div className="max-w-[400px] mx-auto my-16 p-4">
            <div className="flex flex-col">
                {id && <p className="text-center py-2">{id}</p>}
                <TimeTable freeTimes={freeTimes} />
            </div>
        </div>
    );
};

export default ViewTimeTable;
