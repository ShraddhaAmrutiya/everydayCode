const nameRegex = /^[A-Za-z']+ [A-Za-z]+$/;
const emailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in)$/;
const ageRegex = /^\d{1,2}$/;
const cityRegex = /^[a-zA-Z\s'-]+$/;
const countryRegex = /^[a-zA-Z\s'-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^.-=+<>?&*()]).{8,15}$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const stringRegex = /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/;
const websiteRegex1 = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;

const colourRegex = /^[a-zA-Z]+$/;
const arrayOfStringsRegex = /^[a-zA-Z\s]*$/;
const websiteRegex = /^(https?:\/\/)?(www\.[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;

const currentYear2 = new Date().getFullYear();
const yearRegex = new RegExp(`^(?:${currentYear2}|${Array.from({ length: currentYear2 - 1900 }, (_, i) => 1900 + i).join('|')})$`);

const idRegex = /^@[A-Za-z0-9_]{1,15}$/;

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // Months are zero-indexed in JS
const currentDay = today.getDate();

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

let currentYearPattern = '';
for (let month = 1; month <= currentMonth; month++) {
    const daysPattern = (month === currentMonth) ? `(0[1-${currentDay}])` : daysInMonthRegex(month, currentYear);
    currentYearPattern += `(${daysPattern}\\/${month.toString().padStart(2, '0')}\\/${currentYear})|`;
}

let previousYearsPattern = '';
for (let year = 1900; year < currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
        const daysPattern = daysInMonthRegex(month, year);
        previousYearsPattern += `(${daysPattern}\\/${month.toString().padStart(2, '0')}\\/${year})|`;
    }
}
const combinedPattern = `^(${previousYearsPattern}${currentYearPattern.slice(0, -1)})$`;
const birthdateRegex = new RegExp(combinedPattern);



class Personvalidate{
    constructor(person){
        this.person=person;
        this.errors=[];
        this.sucess=[];
        this.validateDt={
            name: nameRegex,
            age: ageRegex,
            city: cityRegex,
            country: countryRegex,
            email:emailRegex,
            password:passwordRegex,
            phone: phoneRegex,
            occupation: stringRegex,
            company: stringRegex,
            website: websiteRegex1,
            favoriteColor: colourRegex,
            hobbies: arrayOfStringsRegex,
            education: stringRegex,
            degreeYear: yearRegex,
            skills: arrayOfStringsRegex,
            certifications: arrayOfStringsRegex,
            linkedin: websiteRegex,
            github: websiteRegex1,
            twitter: idRegex,
            currentCity: cityRegex,
            birthdate: birthdateRegex,
        
        }
    }

    validateproperty (property, regex ){
        const value=this.person[property];
        if (Array.isArray(value)){
            for (let item of value){
                const trimmeditem =item.trim();
                if(regex.test(trimmeditem)){
                    this.sucess.push(`correct ${property}.`)
                }else{
                    this.errors.push(`${trimmeditem} is invalide, please enter valide ${property} .`)
                }
            }
        }else {
            // if(regex.test(value.trim())){
            if(typeof value === 'string'){
                const trimmedvalue= value.trim()
             if(regex.test(trimmedvalue)){
                this.sucess.push(`correct ${property}.`)
                }else{
                 this.errors.push(`${value} is invalide, please enter valide ${property} .`)
            }
            }else{
                const stringvalue= String(value);
                if(regex.test(stringvalue)){
                    this.sucess.push(`correct ${property}.`)
                }else{
                 this.errors.push(`${value} is invalide, please enter valide ${property} .`)
            }
            }
            }
        }
    

    validatedata(){
        for(const[property , regex] of Object.entries(this.validateDt)){
            this.validateproperty(property,regex);
            if(this.errors.length >0){
                break;
            }
        }
        return{
            validate:this.errors.length ===0,
            errors:this.errors,
            sucess:this.sucess
        };
    }
}


let person = {
    name: "John Doe",
    age: 20,
    city: 'Anytown',
    country: 'USA',
    email: "john.doe@example.com",
    password: 'tEst@4554',
    phone: '123-456-7890',
    occupation: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    website: 'http://www.johndoe.com',
    favoriteColor: 'blue',
    hobbies: ['reading', 'traveling', 'photography'],
    education: "Bachelor's in Computer Science",
    degreeYear: "2015",
    skills: ['JavaScript', 'Python', 'React'],
    certifications: ['AWS Certified Developer', 'Scrum Master'],
    linkedin: 'https://www.linkedin.com/in/johndoe',
    twitter: '@johndoe',
    github: 'https://github.com/johndoe',
    currentCity: 'Anytown',
    birthdate: '12/04/2000'
};

let validator=new  Personvalidate(person);
const a= validator.validatedata();

console.log(a);


