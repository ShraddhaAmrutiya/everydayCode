const nameRegex =  /^[A-Za-z']+ [A-Za-z]+$/;
const emailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in)$/;
const ageRegex=/^\d{1,2}$/
const cityRegex= /^[a-zA-Z\s'-]+$/
const countryRegex= /^[a-zA-Z\s'-]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^.-=+<>?&*()]).{8,15}$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const stringRegex=/^[a-zA-Z0-9'()\s&#.,-]{1,30}$/
const websiteRegex1 = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;

const colourRegex=/^[a-zA-Z]{4,6}$/
const arrayOfStringsRegex= /^[a-zA-Z\s]*$/;
// const websiteRegex = /^(https:\/\/|www\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;
const websiteRegex = /^(https?:\/\/)?(www\.[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;

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



class PersonValidate{
    constructor(person){
        this.person=person;
        this.errors=[];
        this.success=[];
        
    };

    validatename() {
        if (nameRegex.test(this.person.name?.trim())) {
            this.success.push("right name");
        } else {
            this.errors.push(`please enter valid name. Your name ${this.person.name} is invalid.`);
        }
    }

    validateage() {
        if (ageRegex.test(this.person.age)) {
            this.success.push("right age");
        } else {
            this.errors.push(`age ${this.person.age} is invalid.`);
        }
    }

    validatecity() {
        if (cityRegex.test(this.person.city?.trim())) {

            this.success.push("right city");
        } else {
            this.errors.push(`Please enter valid city. ${this.person.city} is invalid.`);
        }
    }

    validatecountry() {
        if (countryRegex.test(this.person.country?.trim())) {
            this.success.push("right country");
        } else {
            this.errors.push(`please enter valid country, ${this.person.country} is invalid.`);
        }
    }

    validateemail() {
        if (emailRegex.test(this.person.email.trim())) {
            this.success.push("right email");
        } else {
            this.errors.push(`Please enter valid email id. ${this.person.email} is incorrect.`);
        }
    }

    validatepassword() {
        if (passwordRegex.test(this.person.password.trim())) {
            this.success.push("right password");
        } else {
            this.errors.push(`Please enter valid password. ${this.person.password} is incorrect.`);
        }
    }

    validatephone() {
        if (phoneRegex.test(this.person.phone)) {
            this.success.push("right phone");
        } else {
            this.errors.push(`Please enter valid phone number. ${this.person.phone} is incorrect.`);
        }
    }

    validateoccupation() {
        if (stringRegex.test(this.person.occupation.trim())) {
            this.success.push("right occupation");
        } else {
            this.errors.push(`Please enter valid occupation. ${this.person.occupation} is incorrect.`);
        }
    }

    validatecompany() {
        if (stringRegex.test(this.person.company.trim())) {
            this.success.push("right company");
        } else {
            this.errors.push(`enter valid company. ${this.person.company} is incorrect.`);
        }
    }

    validatewebsite() {
        if (websiteRegex1.test(this.person.website.trim())) {
            this.success.push("right website");
        } else {
            this.errors.push(`enter valid website. ${this.person.website} is incorrect.`);
        }
    }

    validatecolour() {
        if (colourRegex.test(this.person.favoriteColor)) {
            this.success.push("right colour");
        } else {
            this.errors.push(`enter valid colour. ${this.person.favoriteColor} is incorrect.`);
        }
    }

    validatehobbies() {
        for (let hobby of this.person.hobbies) {
            const trimmedhobby = hobby.trim();
            if (arrayOfStringsRegex.test(trimmedhobby)) {
                this.success.push("right hobby");
            } else {
                this.errors.push(`invalid hobby format: ${trimmedhobby}.`);
            }
        }
    }

    validateducation() {
        if (stringRegex.test(this.person.education.trim())) {
            this.success.push("right education");
        } else {
            this.errors.push("enter valid education.");
        }
    }

    validatedegreeyear() {
        if (yearRegex.test(this.person.degreeYear)) {
            this.success.push("right degree year");
        } else {
            this.errors.push(`enter valid degree year. ${this.person.degreeYear} is incorrect.`);
        }
    }
    

    validatelanguages() {
        for (let language of this.person.languages) {
            const trimmedlanguage = language.trim();
            if (arrayOfStringsRegex.test(trimmedlanguage)) {
                this.success.push("right language");
            } else {
                this.errors.push(`invalid language format: ${trimmedlanguage}.`);
            }
        }
    }


    validateskills() {
        for (let skill of this.person.skills) {
            const trimmedskill = skill.trim();
            if (arrayOfStringsRegex.test(trimmedskill)) {
                this.success.push("right skill");
            } else {
                this.errors.push(`invalid skill format: ${trimmedskill}.`);
            }
        }
    }

    validatecertifications() {
        for (let certification of this.person.certifications) {
            const trimmedcertification = certification.trim();
            if (arrayOfStringsRegex.test(trimmedcertification)) { 
                this.success.push("right certification");
            }
             else {
                this.errors.push(`invalid certification format: ${trimmedcertification}.`);
            }
        }
    }

    validatelinkedin() {
        if (websiteRegex.test(this.person.linkedin.trim())) {
            this.success.push("right linkedin");
        } else {
            this.errors.push(`enter valid linkedin id. ${this.person.linkedin} is incorrect.`);
        }
    }

    validategithub() {
        if (websiteRegex1.test(this.person.github.trim())) {
            this.success.push("right github");
        } else {
            this.errors.push(`enter valid github id. ${this.person.github} is incorrect.`);
        }
    }

    validatetwitter() {
        if (idRegex.test(this.person.twitter.trim())) {
            this.success.push("right twitter");
        } else {
            this.errors.push(`enter valid twitter id. ${this.person.twitter} is incorrect.`);
        }
    }

    validatecurrentcity() {
        if (cityRegex.test(this.person.currentCity.trim())) {
            this.success.push("right current city");
        } else {
            this.errors.push(`enter valid current city. ${this.person.currentCity} is incorrect.`);
        }
    }

    validatebirthdate() {
        if (birthdateREgex.test(this.person.birthdate)) {
            this.success.push("right birthdate");
        } else {
            this.errors.push(`add valid birthdate. ${this.person.birthdate} is incorrect.`);
        }
    }
    
}

let person = {
    name: "jone Doe",
    age: 45,
    city: 'Anytown',
    country: 'USA',
    email: "john.doe@exaple.com",
    password: 'tEst@4554',
    phone: 1234567890,
    occupation: 'Software Engineer',
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
    currentCity: 'Anytoun',
    birthdate: '04/07/2012'
};




const validator = new PersonValidate(person);
  const propertyNames = Object.getOwnPropertyNames(PersonValidate.prototype);
  propertyNames.forEach(propertyName => {
    if (propertyName !== 'constructor' && typeof PersonValidate.prototype[propertyName] === 'function') {
        if (validator.errors.length>0) {
           return
           
        }
        
        
        PersonValidate.prototype[propertyName].call(validator); 
    }
  });
  
// const validate = validator.errors.length === 0;
// console.log("validate:", validate);
// console.log("error" ,validator.errors)
//   console.log("sucess" ,validator.success)

function validateAndLog(validator) {
    const validate = validator.errors.length === 0;
    console.log("validate:", validate);
    console.log("errors:", validator.errors);
    console.log("success:", validator.success); 
  
    return validate;
  }
  
  
  validateAndLog(validator);
  