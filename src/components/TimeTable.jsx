import React from "react";
import TimeButton from "./TimeButton";
import { DAYSOFWEEK } from "../utils/consts";
import { getTimes, getTimeStringsIn12HFormat } from "../utils/util";

const TimeTable = ({ freeTimes, toggleAvailbility }) => {
    console.log(freeTimes);
    return (
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
                {getTimes().map((time, timeKey) => (
                    <tr key={timeKey}>
                        <td>{getTimeStringsIn12HFormat(time)}</td>
                        {DAYSOFWEEK.map((d, i) => (
                            <TimeButton
                                key={`${i}_${freeTimes.includes(
                                    `${d}_${time}`
                                )}`}
                                id={`${d}_${time}`}
                                isFree={freeTimes.includes(`${d}_${time}`)}
                                toggleAvailbility={toggleAvailbility}
                            ></TimeButton>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TimeTable;
