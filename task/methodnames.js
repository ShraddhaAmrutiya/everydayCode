const nameRegex = /^[A-Za-z']+ [A-Za-z]+$/;
const emailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in)$/i;
const ageRegex = /^\d{1,2}$/;
const cityRegex = /^[a-zA-Z\s'-]+$/;
const countryRegex = /^[a-zA-Z\s'-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^.-=+<>?&*()]).{8,15}$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const stringRegex = /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/;
const websiteRegex1 = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?/;
const websiteRegex = /^(https?:\/\/)?(www\.[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?/;
const idRegex = /^@[A-Za-z0-9_]{1,15}$/;

const currentYear = new Date().getFullYear();
const yearRegex = new RegExp(`^(?:${currentYear}|${Array.from({ length: currentYear - 1900 }, (_, i) => 1900 + i).join('|')})$`);

class personvalidate {
    constructor(person) {
        this.person = person;
        this.errors = [];
        this.success = [];

        // Binding all methods to the instance
        this.validatename = this.validatename.bind(this);
        this.validateage = this.validateage.bind(this);
        this.validatecity = this.validatecity.bind(this);
        this.validatecountry = this.validatecountry.bind(this);
        this.validateemail = this.validateemail.bind(this);
        this.validatepassword = this.validatepassword.bind(this);
        this.validatephone = this.validatephone.bind(this);
        this.validateoccupation = this.validateoccupation.bind(this);
        this.validatecompany = this.validatecompany.bind(this);
        this.validatewebsite = this.validatewebsite.bind(this);
        this.validatecolour = this.validatecolour.bind(this);
        this.validatehobbies = this.validatehobbies.bind(this);
        this.validateducation = this.validateducation.bind(this);
        this.validatedegreeyear = this.validatedegreeyear.bind(this);
        this.validateskills = this.validateskills.bind(this);
        this.validatecertifications = this.validatecertifications.bind(this);
        this.validatelinkedin = this.validatelinkedin.bind(this);
        this.validategithub = this.validategithub.bind(this);
        this.validatetwitter = this.validatetwitter.bind(this);
        this.validatecurrentcity = this.validatecurrentcity.bind(this);
        this.validatebirthdate = this.validatebirthdate.bind(this);

        // Binding validateData method to the instance
        this.validateData = this.validateData.bind(this);
    }

    validatename() {
        if (nameRegex.test(this.person.name.trim())) {
            this.success.push("right name");
        } else {
            this.errors.push(`Please enter a valid name. Your name '${this.person.name}' is invalid.`);
        }
    }

    validateage() {
        if (ageRegex.test(this.person.age.toString())) {
            this.success.push("right age");
        } else {
            this.errors.push(`Age '${this.person.age}' is invalid.`);
        }
    }

    validatecity() {
        if (cityRegex.test(this.person.city.trim())) {
            this.success.push("right city");
        } else {
            this.errors.push(`Please enter a valid city. '${this.person.city}' is invalid.`);
        }
    }

    validatecountry() {
        if (countryRegex.test(this.person.country.trim())) {
            this.success.push("right country");
        } else {
            this.errors.push(`Please enter a valid country. '${this.person.country}' is invalid.`);
        }
    }

    validateemail() {
        if (emailRegex.test(this.person.email.trim())) {
            this.success.push("right email");
        } else {
            this.errors.push(`Please enter a valid email id. '${this.person.email}' is incorrect.`);
        }
    }

    validatepassword() {
        if (passwordRegex.test(this.person.password.trim())) {
            this.success.push("right password");
        } else {
            this.errors.push(`Please enter a valid password. `);
        }
    }

    validatephone() {
        if (phoneRegex.test(this.person.phone.toString())) {
            this.success.push("right phone");
        } else {
            this.errors.push(`Please enter a valid phone number. '${this.person.phone}' is incorrect.`);
        }
    }

    validateoccupation() {
        if (stringRegex.test(this.person.occupation.trim())) {
            this.success.push("right occupation");
        } else {
            this.errors.push(`Please enter a valid occupation. '${this.person.occupation}' is incorrect.`);
        }
    }

    validatecompany() {
        if (stringRegex.test(this.person.company.trim())) {
            this.success.push("right company");
        } else {
            this.errors.push(`Please enter a valid company. '${this.person.company}' is incorrect.`);
        }
    }

    validatewebsite() {
        if (websiteRegex1.test(this.person.website.trim())) {
            this.success.push("right website");
        } else {
            this.errors.push(`Please enter a valid website. '${this.person.website}' is incorrect.`);
        }
    }

    validatecolour() {
        if (colourRegex.test(this.person.favoriteColor.trim())) {
            this.success.push("right favourite color");
        } else {
            this.errors.push(`Please enter a valid favourite color. '${this.person.favoriteColor}' is incorrect.`);
        }
    }

    validatehobbies() {
        for (let hobby of this.person.hobbies) {
            const trimmedhobby = hobby.trim();
            if (arrayOfStringsRegex.test(trimmedhobby)) {
                this.success.push(`right hobby`);
            } else {
                this.errors.push(`Invalid hobby format: '${trimmedhobby}'.`);
            }
        }
    }

    validateducation() {
        if (stringRegex.test(this.person.education.trim())) {
            this.success.push("right education");
        } else {
            this.errors.push(`Please enter a valid education. '${this.person.education}' is incorrect.`);
        }
    }

    validatedegreeyear() {
        if (yearRegex.test(this.person.degreeYear.toString())) {
            this.success.push("right degree year");
        } else {
            this.errors.push(`Please enter a valid degree year. '${this.person.degreeYear}' is incorrect.`);
        }
    }

    validateskills() {
        for (let skill of this.person.skills) {
            const trimmedskill = skill.trim();
            if (arrayOfStringsRegex.test(trimmedskill)) {
                this.success.push(`right skill`);
            } else {
                this.errors.push(`Invalid skill format: '${trimmedskill}'.`);
            }
        }
    }

    validatecertifications() {
        for (let certification of this.person.certifications) {
            const trimmedcertification = certification.trim();
            if (arrayOfStringsRegex.test(trimmedcertification)) {
                this.success.push(`right certification`);
            } else {
                this.errors.push(`Invalid certification format: '${trimmedcertification}'.`);
            }
        }
    }

    validatelinkedin() {
        if (websiteRegex.test(this.person.linkedin.trim())) {
            this.success.push("right linkedin");
        } else {
            this.errors.push(`Please enter a valid LinkedIn id. '${this.person.linkedin}' is incorrect.`);
        }
    }

    validategithub() {
        if (websiteRegex1.test(this.person.github.trim())) {
            this.success.push("right github");
        } else {
            this.errors.push(`Please enter a valid GitHub id. '${this.person.github}' is incorrect.`);
        }
    }

    validatetwitter() {
        if (idRegex.test(this.person.twitter.trim())) {
            this.success.push("right twitter");
        } else {
            this.errors.push(`Please enter a valid Twitter id. '${this.person.twitter}' is incorrect.`);
        }
    }

    validatecurrentcity() {
        if (cityRegex.test(this.person.currentCity.trim())) {
            this.success.push("right current city");
        } else {
            this.errors.push(`Please enter a valid current city. '${this.person.currentCity}' is incorrect.`);
        }
    }

    validatebirthdate() {
        if (birthdateRegex.test(this.person.birthdate)) {
            this.success.push("right birthdate");
        } else {
            this.errors.push(`Please enter a valid birthdate in format dd/mm/yyyy. '${this.person.birthdate}' is incorrect.`);
        }
    }

    validateData() {
        for (const [key, value] of Object.entries(this.validateDt)) {
            value();
            if (this.errors.length > 0) {
                break;
            }
        }

        return {
            validate: this.errors.length === 0,
            error: this.errors,
            success: this.success
        };
    }
}


const person = {
    name: "John Doe",
    age: 45,
    city: 'Anytown',
    country: 'USA',
    email: "john.doe@example.com",
    password: 'test@4554',
    phone: '1234567890',
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
    birthdate: '04/07/2012',
};


// Function to call all methods from the prototype
function callAllMethods(instance) {
    const proto = Object.getPrototypeOf(instance);
    const methodNames = Object.getOwnPropertyNames(proto);

    return methodNames.filter(methodName => methodName !== 'constructor' && typeof instance[methodName] === 'function');
}


// Create an instance of personvalidate
const validator = new personvalidate(person);

// Call all methods and get the method names
const methodNames = callAllMethods(validator);
console.log(methodNames);
