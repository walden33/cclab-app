export const getTimes = () => {
    const start = 7;
    const end = 16;
    let result = [];
    for (let i = start; i <= end; i++) {
        ["00", "30"].forEach((mm) => {
            if (i < 10) {
                result.push(`0${i}${mm}`);
            } else {
                result.push(`${i}${mm}`);
            }
        });
    }
    return result;
};

/**
 * Converts a HHMM (24h) string to a HH:MM AM/PM string
 *
 * @param {string} hhmm : time in HHMM (24h) format
 * @returns
 */
export const getTimeStringsIn12HFormat = (hhmm) => {
    if (Number(hhmm) < 1200) {
        return `${hhmm.substring(0, 2)}:${hhmm.substring(2, 4)} AM`;
    }
    if (Number(hhmm) < 1300) {
        return `${hhmm.substring(0, 2)}:${hhmm.substring(2, 4)} PM`;
    }
    // subtract 12 for afternoon hours beginning 1300
    const time = Number(hhmm) - 1200;
    if (time < 1000) {
        // pad zero
        return (
            `0${String(time).substring(0, 1)}:` +
            `${String(time).substring(1, 3)} PM`
        );
    }
    return `${String(time).substring(0, 2)}:${String(time).substring(2, 4)} PM`;
};
