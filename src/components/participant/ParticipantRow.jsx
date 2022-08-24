import React from "react";

const ParticipantRow = ({ email, handleCheckAvailability }) => {
    return (
        <tr className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {email}
            </td>
            <td className="border text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => {
                        handleCheckAvailability(email);
                    }}
                >
                    View Availability
                </button>
            </td>
        </tr>
    );
};

export default ParticipantRow;
