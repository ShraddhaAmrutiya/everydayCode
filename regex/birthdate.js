const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // Months are zero-indexed in JS
const currentDay = today.getDate();
  
// Helper function to create regex pattern for days in a month
function daysInMonthRegex(month, year) {
    const month30 = [4, 6, 9, 11]; // Months with 30 days
    if (month30.includes(month)) {
        return '(0[1-9]|[12][0-9]|30)';
    } else if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) { // Leap year
            return '(0[1-9]|1[0-9]|2[0-9])';
        } else {
            return '(0[1-9]|1[0-9]|2[0-8])';
        }
    } else {
        return '(0[1-9]|[12][0-9]|3[01])';
    }
}

// Generate regex pattern for the current year up to today's date
let currentYearPattern = '';
for (let month = 1; month <= currentMonth; month++) {
    const daysPattern = (month === currentMonth) ? `(0[1-${currentDay}])` : daysInMonthRegex(month, currentYear);
    currentYearPattern += `(${daysPattern}\\/${month.toString().padStart(2, '0')}\\/${currentYear})|`;
}

// Generate regex pattern for previous years from 1900 to the year before the current year
let previousYearsPattern = '';
for (let year = 1900; year < currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
        const daysPattern = daysInMonthRegex(month, year);
        previousYearsPattern += `(${daysPattern}\\/${month.toString().padStart(2, '0')}\\/${year})|`;
    }
}

// Combine all patterns and remove the trailing '|'
const combinedPattern = `^(${previousYearsPattern}${currentYearPattern.slice(0, -1)})$`;
const dateRegex = new RegExp(combinedPattern);




///////////////////////////////////////////////////////////////////////////////////////////////////

// short form of this regex 









// Example usage:
const datesToValidate = ["08/07/2024"];

datesToValidate.forEach(date => {
    if (dateRegex.test(date)) {
        console.log(`${date} is valid .`);
    } else {
        console.log(`${date} is not valid .`);
    }
});
