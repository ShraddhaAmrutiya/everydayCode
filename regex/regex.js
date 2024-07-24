// const nameRegex = /^( ?[a-zA-Z]{3,50} ?)+$/;
const nameRegex =  /^[A-Za-z']+ [A-Za-z]+$/;
// const emailRegex= /^[a-z1-9._%@][a-z0-9.-@]+\.+[a-z]{2,6}$/;
// const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//  const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[in|com]$/;
//  const emailRegex =/ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// const emailRegex = /^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+(?:com|in)$/i;
// const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9-]+\.(?:com|in)$/i;
const emailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in)$/i;

// const passwordRegex= /^[a-zA-Z\d!@#$%^&*()_+\-=[\]{}|;:'",.<>?/]{8,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^.-=+<>?&*()]).{8,15}$/;

// const phoneRegex = /^(\d{3}[- ]?\d{3}[- ]?\d{4})$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
// const phoneRegex = /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/;
 
// const websiteRegex=/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;
// const websiteRegex = /^(?:https?:\/\/|www\.)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;
const websiteRegex = /^(https?:\/\/)?(www\.[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;

// const yearRegex=/^[0-9]{4}$/
// const yearRegex=/^(19\\d\\d|20[0123]\\d|${currentYear})$/
// const regexPattern = new RegExp(`^${currentYear}$`)

const currentYear2 = new Date().getFullYear();
const yearRegex=new RegExp(`^(?:${currentYear2}|${Array.from({ length: currentYear2 - 1900 }, (_, i) => 1900 + i).join('|')})$`);

// const birthdateREgex=/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
// const birthdateREgex = /^(?:(? :31\/(?:0?[13578]|1[02]))\/|(?:(?:29|30)\/(?:0?[1,3-9]|1[0-2])\/|(?:(?:0?[1-9]|1\d|2[0-8])\/)(?:0?[1-9]|1[0-2])\/)(?:19|20)?\d{2}|29\/0?2\/(?:(?:19|20)(?:[02468][048]|[13579][26])|(?:19|20)00))$/;
// const today = new Date();
// const currentDay = today.getDate().toString().padStart(2, '0');
// const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
// const currentYear1 = today.getFullYear().toString();

// const birthdateREgex = new RegExp(`^${currentDay}/${currentMonth}/${currentYear1}$`);

// const today = new Date();
// const currentYear1 = today.getFullYear();
// const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
// const currentDay = today.getDate().toString().padStart(2, '0');

// // Build a regex pattern for the date format DD/MM/YYYY
// const birthdateREgex = new RegExp(
//   `^(0[1-9]|[12][0-9]|3[01])\\/(0[13578]|1[02])\\/(19[0-9]{2}|20[0-9]{2})|` + // Matches dates for months with 31 days
//   `(0[1-9]|[12][0-9]|30)\\/(0[469]|11)\\/(19[0-9]{2}|20[0-9]{2})|` + // Matches dates for months with 30 days
//   `(0[1-9]|1[0-9]|2[0-8])\\/02\\/(19[0-9]{2}|20[0-9]{2})|` + // Matches dates for February (non-leap years)
//   `29\\/02\\/((19|20)([02468][048]|[13579][26]))$|` + // Matches February 29th for leap years
//   `(${currentDay}\\/${currentMonth}\\/${currentYear1})$` // Matches today's date
// );

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
const birthdateREgex = new RegExp(combinedPattern);



const errors=[ ];
const success =[ ];


let person={
    password: 'Dest\\dff3',
    phone:    1234567890 ,
    website: 'http://www.johndoe.com',
    degreeYear: 2024,
    linkedin: 'https://www.linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    birthdate : '10/07/2024'
} ;

let validatepassword= ()=>{
    if (passwordRegex.test(person.password.trim())){
        success.push(` password :${person.password}`) 
        // return 'correct password'
    } else{
        errors.push(` Please enter valide password . ${person.password} is incorrect .`)
    }
}
// validatepassword()

let velidatdegreeyear= ()=>{
    if (yearRegex.test (parseInt(person.degreeYear))){
        success.push(` degree year:${person.degreeYear}`) 
        // return "right degreeyear"
    } else{
        errors.push(`enter valide degreeyear .  ${person.degreeYear} is incorrect .`)
    }
}
velidatdegreeyear()



let velidatphone= ()=>{
    if (phoneRegex.test(person.phone)){
        
        // return "right phone"
        success.push(` phone :${person.phone}`) 
    } else{
        errors.push(`Please enter valide phone number. ${person.phone} is incorrect .`)
    }
}
// velidatphone()

let velidatwebsite= ()=>{
    if (websiteRegex.test(person.website.trim())){
        // return "right website"
        success.push(` website:${person.website}`) 
    } else{
        errors.push(`enter valide website . ${person.website} is incorrect .`)
    }
}
// velidatwebsite()


let validatebirthdate=()=>{
    if(birthdateREgex.test(person.birthdate)){
            // return "right birthdate"
            success.push(` birth date :${person.birthdate}`) 
    }else{
        errors.push(`add valid birthdate. ${person.birthdate} is incorrect .`)
    }
}
validatebirthdate()





console.log( "errors: ", errors)
console.log('success: ', success)