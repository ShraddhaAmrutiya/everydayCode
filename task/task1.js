/////////////////////******************************************* *////////////////////////////
//Create a function that validates and sanitizes an object's properties and values. The function should perform the following tasks:

//1. Validate the object properties based on their types and ensure all required keys are present.
//2. Sanitize the object by removing any keys with null or empty string values.
///3. Trim white-space around the values of the object.
///4. Return `true` if all validations pass; otherwise, raise an error indicating which key is invalid.




const nameRegex =  /^[A-Za-z']+ [A-Za-z]+$/;
const emailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in)$/i;
const ageRegex=/^\d{1,2}$/
const cityRegex= /^[a-zA-Z\s'-]+$/
const countryRegex= /^[a-zA-Z\s'-]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^.-=+<>?&*()]).{8,15}$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const stringRegex=/^[a-zA-Z0-9'()\s&#.,-]{1,30}$/
const websiteRegex = /^(https?:\/\/)?(www\.[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;
const colourRegex=/^[a-zA-Z]+/
const arrayOfStringsRegex= /^[a-zA-Z\s]*$/;

const currentYear2 = new Date().getFullYear();
const yearRegex=new RegExp(`^(?:${currentYear2}|${Array.from({ length: currentYear2 - 1900 }, (_, i) => 1900 + i).join('|')})$`);

const idRegex = /^@[A-Za-z0-9_]{1,15}$/;


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
    name :"John Doe " ,
    age: 666,
    city: 'Anytown',
    country: 'USA',
    email :"john.doe@example.com.in.in",
    password: 'Test@1234',
    phone:  1234567890,
    occupation: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    website: 'http://www.johndoe.com',
    favoriteColor: 'blue',
    hobbies: [ 'reading', 'traveling', 'photoraphy' ],
    education: "Bachelor's in Computer Science",
    degreeYear: 2015,
    languages: [ 'English', 'Spanish','Gujarati', 'Hindi' ],
    skills: [ 'JavaScript', 'Python', 'React' ],
    certifications: [ 'AWS Certified Developer', 'Scrum Master' ],
    linkedin: 'https://www.linkedin.com/in/johndoe',
    twitter: '@johndoe',
    github: 'https://github.com/johndoe',
    currentCity: 'Anytown',
    birthdate : '10/07/2024'
} ;
// console.log(typeof(person))


let validatename =() =>{
    if (nameRegex.test(person.name.trim())){
        success.push (` name : ${person.name}`)
        // return `correct name`
    }else{
        errors.push(`please enter valide name.your name ${person.name}is invalide. `)
    }
}

// validatename()


let validateage=()=>{
    if(ageRegex.test(person.age)){
     success.push(`age :${person.age}`)
    //  return 'correct age '
    } else{
        errors.push(`age ${person.age} is invalide .`)
    }
}
// validateage()

let validatecity=()=>{
    if(cityRegex.test(person.city.trim())){
        success.push(`city :${person.city}`)  
        // return 'correct city'

    } else{
        errors.push(`Please enter valide city. ${person.city} is invalide.`)
    }
}
// validatecity()

let validatecountry=()=>{
    if(countryRegex.test(person.country.trim())){
        success.push(`country : ${person.country}`)  
        // return 'correct country'
    } else{
        errors.push(`pelase enter valide city , ${person.country} is invalide .`)
    }
}
// validatecountry()

let validateemail=()=>{
    if(emailRegex.test(person.email.trim())){
        success.push(` email:${person.email}`) 
        // return 'correct email'
       } 
        else{
        errors.push(`Please enter valide email id. ${person.email} is incorrect. `)
    }
}
// validateemail()

let validatepassword= ()=>{
    if (passwordRegex.test(person.password.trim())){
        success.push(` password :${person.password}`) 
        // return 'correct password'
    } else{
        errors.push(` Please enter valide password . ${person.password} is incorrect .`)
    }
}
// validatepassword()

let velidatphone= ()=>{
    if (phoneRegex.test(person.phone)){
        
        // return "right phone"
        success.push(` phone :${person.phone}`) 
    } else{
        errors.push(`Please enter valide phone number. ${person.phone} is incorrect .`)
    }
}
// velidatphone()

let velidatoccupation= ()=>{
    if (stringRegex.test(person.occupation.trim())){
        // return "right occupation "
        success.push(` occupation:${person.occupation}`) 
    } else{
        errors.push(`Please enter valide occupation . ${person.occupation} is incorrect .`)
    }
}
// velidatoccupation()

let velidatcompany= ()=>{
    if (stringRegex.test(person.company.trim())){
        // return "right company"
        success.push(` company:${person.company}`) 
    } else{
        errors.push(`enter valide company. ${person.company} is incorrect .`)
    }
}
// velidatcompany()


let velidatwebsite= ()=>{
    if (websiteRegex.test(person.website.trim())){
        // return "right website"
        success.push(` website:${person.website}`) 
    } else{
        errors.push(`enter valide website . ${person.website} is incorrect .`)
    }
}
// velidatwebsite()


let velidatcolour= ()=>{
    if (colourRegex.test(person.favoriteColor)){
        // return "right colour"
        success.push(` colour:${person.colour}`) 
    } else{
        errors.push(`enter valide colour . ${person.favoriteColor} is incorrect .`)
    }
}
// velidatcolour()

let validatehobbies=() =>{
    for(let hobby of person.hobbies){
        const trimmedHobby = hobby.trim();
        if(arrayOfStringsRegex.test(trimmedHobby)){
            success.push(` occupation:${person.occupation}`) }
            else{
            errors.push(`invalide hobby formate: ${trimmedHobby}`)
        }
    }
}
// validatehobbies()


let validateducation= ()=>{
    if (stringRegex.test(person.education.trim())){

        // return "right education"
        success.push(` education:${person.education}`) 
    } else{
        errors.push("enter valide education .")
    }
}
// validateducation()

let velidatdegreeyear= ()=>{
    if (yearRegex.test (parseInt(person.degreeYear))){
        success.push(` degree year:${person.degreeYear}`) 
        // return "right degreeyear"
    } else{
        errors.push(`enter valide degreeyear .  ${person.degreeYear} is incorrect .`)
    }
}
// velidatdegreeyear()

let velidatskills= ()=>{
    for(let skill of person.skills)()=>{
        const trimmedskill = skill.trim();
        if (arrayOfStringsRegex.test(trimmedskill)){
            success.push(` skills:${person.skills}`) }
            else{
        errors.push(`invalide language formate: ${trimmedskill}.`)
    }
}
}
// velidatskills()

let velidatcertifications= ()=>{
    for(let certification of person.certifications)()=>{
        const trimmedcertification = skill.trim();

        if (arrayOfStringsRegex.test(trimmedcertification)){
            success.push(` cirtifications :${person.certifications}`) }
            else {
        errors.push(`invalide language formate: ${trimmedcertification}.`)
    }
}
}
// velidatcertifications()



let velidatlinkedin= ()=>{
    if (websiteRegex.test(person.linkedin.trim())){
        // return "right linkdin"
        success.push(` linkedin :${person.linkedin}`) 
    } else{
        errors.push(`enter valide linkedin id . ${person.linkedin} is incorrect .`)
    }
}
// velidatlinkedin()


let velidatgithub= ()=>{
    if (websiteRegex.test(person.github.trim())){
        success.push(` Github:${person.github}`) 
        // return "right github"
    } else{
        errors.push(`enter valide github id . ${person.github} is incorrect .`)
    }
}
// velidatgithub()

let validatetwitter= ()=>{
    if (idRegex.test(person.twitter.trim())){
        // return "right twitter"
        success.push(` twitter :${person.twitter}`) 
    } else{
        errors.push(`enter valide twitter id . ${person.twitter} is incorrect .`)
    }
}
// validatetwitter()

let validatecurrentcity=()=>{
    if(cityRegex.test(person.currentCity.trim())){
        // return "right currentcity"
        success.push(` current city:${person.currentCity}`) 
    } else{
        errors.push(`enter valide currentcity . ${person.currentCity} is incorrect .`)
    }
}
// validatecurrentcity()

let validatebirthdate=()=>{
    if(birthdateREgex.test(person.birthdate)){
            // return "right birthdate"
            success.push(` birth date :${person.birthdate}`) 
    }else{
        errors.push(`add valid birthdate. ${person.birthdate} is incorrect .`)
    }
}
// validatebirthdate()

const validateDt = ()=>{
    validatename(), validateage(),validatecity(),validatecountry(),validateemail(),validatepassword(),
    velidatphone(), velidatoccupation(), velidatcompany(), velidatwebsite(), velidatcolour(), validatehobbies(),
    validateducation(), velidatdegreeyear(), velidatskills(), velidatcertifications(), velidatlinkedin(), 
    velidatgithub(), validatetwitter(), validatecurrentcity(), validatebirthdate()

}

validateDt()
console.log( "errors: ", errors)
console.log('success: ', success)




// class Validator {
//     constructor() {
//         this.success = [];
//         this.errors = [];
//     }
// }
// const validator = new Validator();
// validator.validateDt();

// console.log(validator.success);
// console.log(validator.errors);


// validate.printMessage(true); // 
// validate.printMessage(false); // Prints 


//     // validate:console.log(validateDt),
//     // errors:console.log(errors)  ,
//     // success: console.log(success)
//     if (!condition) {
//         console.log("error");
//     }
//     if (condition) {
//         console.log("success");
//     }
        



// class data{
//     constructor (validateDt){
//         this.validate = validateDt
//         // this.errors = errors;
//         // this.success = success;
//     }
//     printSuccess() {
//         if (this.validate) {
//           console.log(success);
//           console.log(true);
//         }
//         else {
//         console .log(errors)
//         console.log(false)
//     }
// }
// }
