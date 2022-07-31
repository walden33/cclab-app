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

export const getTimeStringsIn12HFormat = () => {
    let result = [];
    const times = getTimes();
    times.forEach((time) => {
        if (Number(time) < 1200) {
            // AM
            result.push(`${time.substring(0, 2)}:${time.substring(2, 4)} AM`);
        } else {
            // PM
            result.push(`${time.substring(0, 2)}:${time.substring(2, 4)} PM`);
        }
    });
    return result;
};
