//////////////////////////*******************************/////////////////////////////
//convert task2 into a nested function (if 1st function gives an error then the code should not run)-



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



class Personvalidate {constructor(person) {
    this.person = person;
    this.errors = [];
    this.success = [];
      }
 
           
    validateDt() {
        const validations = {
            validatename: () => {
                if (nameRegex.test(this.person.name.trim())) {
                    this.success.push(`Your name  is valid.`);
                    return true;
                } else {
                    this.errors.push(` Your name "${this.person.name}" is invalid.`);
                    return false;
                }
            },
            validateage: () => {
                if (ageRegex.test(this.person.age)) {
                    this.success.push(`Your age  is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid age. Your age "${this.person.age}" is invalid.`);
                    return false;
                }
            },
            validatecity: () => {
                if (cityRegex.test(this.person.city.trim())) {
                    this.success.push(`Your city  is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid city. Your city "${this.person.city}" is invalid.`);
                    return false;
                }
            },
            validatecountry: () => {
                if (countryRegex.test(this.person.country.trim())) {
                    this.success.push(`Your country  is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid country. Your country "${this.person.country}" is invalid.`);
                    return false;
                }
            },
            validateemail: () => {
                if (emailRegex.test(this.person.email.trim())) {
                    this.success.push(`Your email "${this.person.email}" is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid email. Your email "${this.person.email}" is invalid.`);
                    return false;
                }
            },
            validatepassword: () => {
                if (passwordRegex.test(this.person.password.trim())) {
                    this.success.push(`Your password is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid password. Your password "${this.person.password}" is invalid.`);
                    return false;
                }
            },
            validatephone: () => {
                if (phoneRegex.test(this.person.phone)) {
                    this.success.push(`Your phone number is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid phone number. Your phone number "${this.person.phone}" is invalid.`);
                    return false;
                }
            },
            validateoccupation: () => {
                if (stringRegex.test(this.person.occupation.trim())) {
                    this.success.push(`Your occupation is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid occupation. Your occupation "${this.person.occupation}" is invalid.`);
                    return false;
                }
            },
            validatecompany: () => {
                if (stringRegex.test(this.person.company.trim())) {
                    this.success.push(`Your company is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid company. Your company "${this.person.company}" is invalid.`);
                    return false;
                }
            },
            validatewebsite: () => {
                if (websiteRegex.test(this.person.website.trim())) {
                    this.success.push(`Your website  is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid website. Your website "${this.person.website}" is invalid.`);
                    return false;
                }
            },
            validatecolour: () => {
                if (colourRegex.test(this.person.favoriteColor)) {
                    this.success.push(`Your color is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid color. Your color "${this.person.favoriteColor}" is invalid.`);
                    return false;
                }
            },
            validatehobbies: () => {
                for (let hobby of this.person.hobbies) {
                    if (arrayOfStringsRegex.test(hobby.trim())) {
                        this.success.push(`Your hobbies "${this.person.hobbies.join(', ')}" are valid.`);
                return true;
                    }else{ this.errors.push(`Please enter valid hobbies.`);
                        return false;}
                }
               
            },
            validateducation: () => {
                if (stringRegex.test(this.person.education.trim())) {
                    this.success.push(`Your education is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid education. Your education "${this.person.education}" is invalid.`);
                    return false;
                }
            },
            validatedegreeyear: () => {
                if (yearRegex.test(this.person.degreeYear)) {
                    this.success.push(`Your degree year is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid degree year. Your degree year "${this.person.degreeYear}" is invalid.`);
                    return false;
                }
            },
            validateskills: () => {
                for (let skill of this.person.skills) {
                    if (arrayOfStringsRegex.test(skill.trim())) {
                        this.success.push(`Your skills  are valid.`);
                        return true;
                    }else{
                    this.errors.push(`. Your skill  is invalid.`);
                        return;}
                }
                
            },
            validatecertifications: () => {
                for (let certification of this.person.certifications) {
                    if (arrayOfStringsRegex.test(certification.trim())) {
                        this.success.push(`Your certifications are valid.`);
                return true;
                    }else{this.errors.push(`Please enter valid certifications. `);
                    return false;}
                }
                
            },
            validatelinkedin: () => {
                if (websiteRegex.test(this.person.linkedin.trim())) {
                    this.success.push(`Your LinkedIn URL  is valid.`);
                    return true;
                } else {
                    this.errors.push(`. Your LinkedIn URL "${this.person.linkedin}" is invalid.`);
                    return false;
                }
            },
            validategithub: () => {
                if (websiteRegex.test(this.person.github.trim())) {
                    this.success.push(`Your GitHub URL  is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid GitHub URL. Your GitHub URL "${this.person.github}" is invalid.`);
                    return false;
                }
            },
            validatetwitter: () => {
                if (idRegex.test(this.person.twitter.trim())) {
                    this.success.push(`Your Twitter ID  is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid Twitter ID. Your Twitter ID "${this.person.twitter}" is invalid.`);
                    return false;
                }
            },
            validatecurrentcity: () => {
                if (cityRegex.test(this.person.currentCity.trim())) {
                    this.success.push(`Your current city is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid current city. Your current city "${this.person.currentCity}" is invalid.`);
                    return false;
                }
            },
            validatebirthdate: () => {
                if (birthdateREgex.test(this.person.birthdate)) {
                    this.success.push(`Your birthdate  is valid.`);
                    return true;
                } else {
                    this.errors.push(`Please enter a valid birthdate. Your birthdate "${this.person.birthdate}" is invalid.`);
                    return false;
                }
            }
        };
                
        for (let key in validations) {
            // console.log(key)
            if (!validations[key]()) {
                // console.log("-----------------------------------------1111111111---------------",validations)
                return {
                    validate: false,
                    success: this.success,
                    errors: this.errors
                };
            }
        }

        return {
            validate: true,
            errors: this.errors,
            success: this.success
        };
        
}     
        }
    



let person = {
    name: "John Doe",
    age:    23,
    city: 'Anytown',
    country: 'USA',
    email: "john.doe@exaple.com",
    password: "Password@123",
    phone: 1234567890,
    occupation: "Software Engineer",
    company: 'Tech Solutions Inc.',
    website: 'http://www.johndoe.com',
    favoriteColor: 'blue',
    hobbies: ['reading', 'traveling', 'photography'],
    education: "Bachelor's in Computer Science",
    degreeYear: 2024,
    languages: ['English', 'Spanish', 'Gujarati', 'Hindi'],
    skills: ['JavaScript', 'Python', 'React'],
    certifications: ['AWS Certified Developer', 'Scrum Master'],
    linkedin: 'https://www.linkedin.com/in/johndoe',
    twitter: '@johndoe',
    github: 'https://github.com/johndoe',
    currentCity: 'Anytown',
    birthdate: '10/07/2024'
};


let validator = new Personvalidate(person);
  const a= validator.validateDt();

console.log(a)

