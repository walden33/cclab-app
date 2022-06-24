import React from "react";

const SessionRow = (props) => {
    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {props.code}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {props.start}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {props.end}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {props.ra}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {"$ ".concat(props.compensation)}
            </td>
        </tr>
    );
};

export default SessionRow;
