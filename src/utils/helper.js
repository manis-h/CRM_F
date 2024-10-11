export const parseDateString = (dateString) => {
    // Regex for different date formats
    const regexISO = /^\d{4}-\d{2}-\d{2}$/;  // YYYY-MM-DD
    const regexUS = /^\d{2}\/\d{2}\/\d{4}$/; // MM/DD/YYYY
    const regexEU = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY
    const regexDashEU = /^\d{2}-\d{2}-\d{4}$/; // DD-MM-YYYY

    let parsedDate = null;

    if (regexISO.test(dateString)) {
        parsedDate = new Date(dateString);
    } else if (regexUS.test(dateString)) {
        const [month, day, year] = dateString.split('/');
        parsedDate = new Date(`${year}-${month}-${day}`);
    } else if (regexEU.test(dateString)) {
        const [day, month, year] = dateString.split('/');
        parsedDate = new Date(`${year}-${month}-${day}`);
    } else if (regexDashEU.test(dateString)) {
        const [day, month, year] = dateString.split('-');
        parsedDate = new Date(`${year}-${month}-${day}`);
    }

    return !isNaN(parsedDate.getTime()) ? parsedDate : null;
};

export const compareDates = (dateString1, dateString2) => {
    const date1 = parseDateString(dateString1);
    const date2 = parseDateString(dateString2);

    if (!date1 || !date2) {
        return "Invalid date format";
    }

    return date1.getTime() === date2.getTime() 
};
