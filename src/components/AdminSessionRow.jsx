import React from "react";

const AdminSessionRow = ({
    id,
    code,
    start,
    end,
    ra,
    compensation,
    status,
    handleComplete,
    handleRemove,
}) => {
    return (
        <tr className="border-b">
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap ">
                {code}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {start}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {end}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {ra}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {`$ ${compensation}`}
            </td>
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {status}
            </td>
            <td className="border text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => {
                        handleComplete(id);
                    }}
                >
                    Complete
                </button>
            </td>
            <td className="border text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => {
                        handleRemove(id);
                    }}
                >
                    Remove
                </button>
            </td>
        </tr>
    );
};

export default AdminSessionRow;
