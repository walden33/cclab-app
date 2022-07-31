export const getTimes = () => {
    const start = 7;
    const end = 16;
    let result = [];
    for (let i = start; i <= end; i++) {
        ["00", "30"].map((mm) => {
            if (i < 10) {
                result.push(`0${i}${mm}`);
            } else {
                result.push(`${i}${mm}`);
            }
        });
    }
    return result;
};
