import React from "react";

const TableHeader = ({ labels }) => {
    return (
        <thead className="border-b">
            <tr>
                {labels.map((label, i) => (
                    <th
                        key={i}
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        {label}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
