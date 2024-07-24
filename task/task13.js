////// remove key if value is null , undefine or empty string 

const abc = {
    id: 1,
    name: "",
    username: "Bret",
    email: "sincere35@april.biz",
    address: {
      street: " agrftrytb 5",
      suite: "Apt. 556",
      city: "Gwenborough",
       zipcode: "92998-3874",
      geo: {
        lat: -37.3159,
        lng: 81.1496,
      },
    },
    local_location: [
      {
        name: "Romaguera Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
        money: 98,
        active: true,
      },
      {
        name: "asd dfd",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
        money: 98,
        active: true,
      },
      {
        name: "asdf ghj",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
        money: 100,
        active: true,
      },
    ],
    phone: "1-770-736-8031 x5644",
    website: "www.hildegard.org.",
    company: {
      name: "asdf ghjk",
      number: "1234567897",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  
  const Patterns = {
    id: { type: Number, regex: /^\d+$/, range: [1, 20], min: 1, max: 20 },
    name: {
      type: String,
      regex: /^[A-Za-z]{1,15} [A-Za-z]{1,15}$/,
      min: 3,
      max: 30,
    },
    username: { type: String, regex: /^[\w']+$/, min: 3, max: 20 },
    email: {
      type: String,regex: /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in|biz)$/,min:8,max:30,callback: (email) => {
        const nameOfemail = email.replace(/(\.com|\.in|\.biz)$/, '');
        return { email, nameOfemail ,typeofEmail: typeof email};
      }, },
    address: {
      type: Object,
      nested: {
        street: { type: String, regex: /^[a-zA-Z\s0-9]+$/, min: 3, max: 30 },
        suite: { type: String,regex: /^[a-zA-Z0-9'()\s&#.,-]+$/, min: 1, max: 30,},
        city: { type: String, regex: /^[a-zA-Z\s'-]+$/, min: 1, max: 23 },
        zipcode: { type: String, regex: /^\d{5}-\d{4}$/, min: 10, max: 10 },
        geo: {
          type: Object,
          nested: {
            lat: { type: Number, regex: /^-?\d+(\.\d+)?$/,range:[-90,90], min: -90, max: 90 },
            lng: { type: Number, regex: /^-?\d+(\.\d+)?$/,range:[-180,180] ,min: -180, max: 180 },
          },
        },
      },
    },
    local_location: {
      type: Array,
      of: {
        type: Object,
        nested: {
          name: { type: String, regex: /^[A-Za-z\s]+$/, min: 1, max: 50 },
          catchPhrase: {
            type: String,regex: /^[\w\s'"\-,.:;!]+$/,min: 1,max: 100, },
          bs: { type: String, regex: /^[\w\s'-]+$/, min: 1, max: 100 },
          money: { type: Number, regex: /^\d+$/, range:[1,100],min: 1, max: 3,callback: (value) => {
            return  value.toString(); }, },
          active: { type: Boolean },
          test: {
            optional: true,
            catchPhraset: { type: String, regex: /^[\w\s]+$/, min: 1, max: 50 },
          },
        },
      },
    },
    phone: { type: String,regex: /^(\d{1,3})-(\d{3})-(\d{3})-(\d{4}) x(\d+)$/, min: 10,max: 20, },
    website: {type: String,regex: /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9./]+$/,min: 5,max: 50 },
    company: {
      type: Object,
      nested: {
        name: { type: String, regex: /^[A-Za-z\s]+$/, min: 3, max: 30 },
        number: {
            type: String,
            regex: /^\d+$/,
            min: 9,
            max: 20,
            callback: (number) => {
              if (number.length === 9) {
                return "+1 " + number;
              } else if (number.length === 10) {
                return "+91 " + number;
              } else if (number.length === 11) {
                return "+123 " + number;
              } else {
                return number;
              }
            },
          },
        catchPhrase: { type: String, regex: /^[\w\s'"\-,.:;!]+$/,min: 1,max: 100, },
        bs: { type: String, regex: /^[\w\s'-]+$/, min: 1, max: 50 },
      },
    },
  };
  

function refine(obj) {
    function checkAndTrim(value, path) {
      if (typeof value === "string") {
        value = value.trim();
      }
  
      if (value == null || value === "" || value === undefined) {
        // console.error(`Error at ${path}: it is undefined, null, or an empty string`);
        return undefined; // Remove the key from the object
      }
  
      if (Array.isArray(value)) {
        let newArray = [];
        for (let i = 0; i < value.length; i++) {
          let refinedValue = checkAndTrim(value[i], `${path}[${i}]`);
          if (refinedValue !== undefined) {
            newArray.push(refinedValue);
          }
        }
        return newArray.length > 0 ? newArray : undefined; // Remove array if empty
      }
  
      if (typeof value === "object") {
        let newObj = {};
        for (let key in value) {
          if (value.hasOwnProperty(key)) {
            let refinedValue = checkAndTrim(value[key], `${path}.${key}`);
            if (refinedValue !== undefined) {
              newObj[key] = refinedValue;
            }
          }
        }
        return Object.keys(newObj).length > 0 ? newObj : undefined; // Remove object if empty
      }
  
      return value;
    }
  
    let refinedObj = checkAndTrim(obj, "obj");
    if (refinedObj === undefined) {
      return null; // Return null if the entire object is empty
    }
  
    return refinedObj;
  }
  

function validate(obj, patterns, parentKey = "") {
    let result = {
      validate: true,
      errors: [],
      successes: [],
      data: null,
    };
  
    for (const prop in patterns) {
      if (!patterns.hasOwnProperty(prop)) {
        continue;
      }
  
      const fullPropName = parentKey ? `${parentKey}.${prop}` : prop;
      const pattern = patterns[prop];
      let value = obj[prop];
  
      // Check if the property exists in the object or is optional
      if (value === undefined) {
        if (!pattern.optional) {
          result.validate = false;
        //   result.errors.push({ message: `${fullPropName} is undefined.` });
        }
        continue;
      }
  
      // Validate nested objects
      if (pattern.type === Object && pattern.nested) {
        if (typeof value !== "object" || value === null) {
          result.validate = false;
          result.errors.push({
            message: `${fullPropName} should be an Object.`,
          });
          continue;
        }
  
        const nestedValidation = validate(value, pattern.nested, fullPropName);
        if (!nestedValidation.validate) {
          result.validate = false;
          result.errors.push(
            ...nestedValidation.errors.map((error) => ({
              message: error.message,
            }))
          );
        } else {
          result.successes.push(`"${fullPropName}" is valid.`);
        }
      }
  
      // Validate arrays of objects
      if (
        pattern.type === Array &&
        pattern.of &&
        pattern.of.type === Object &&
        pattern.of.nested
      ) {
        if (!Array.isArray(value)) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be an Array.` });
          continue;
        }
  
        for (let i = 0; i < value.length; i++) {
          const arrayValidation = validate(
            value[i],
            pattern.of.nested,
            `${fullPropName}[${i}]`
          );
          if (!arrayValidation.validate) {
            result.validate = false;
            result.errors.push(
              ...arrayValidation.errors.map((error) => ({
                message: error.message,
              }))
            );
          } else {
            result.successes.push(`"${fullPropName}[${i}]" is valid.`);
          }
        }
      }
  
      // Validate leaf nodes (non-object properties)
      if (
        pattern.type !== Object &&
        pattern.type !== Array &&
        pattern.nested === undefined
      ) {
        if (pattern.type && typeof value !== pattern.type.name.toLowerCase()) {
          result.validate = false;
          result.errors.push({
            message: `${fullPropName} should be of type ${pattern.type.name.toLowerCase()}.`,
          });
          continue;
        }
  
        if (pattern.regex && !pattern.regex.test(value)) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} is invalid.` });
          continue;
        }
  
        if (pattern.range && typeof value === "number") {
          const [min, max] = pattern.range;
          if (value < min || value > max) {
            result.validate = false;
            result.errors.push({
              message: `${fullPropName} should be between ${min} and ${max}.`,
            });
            continue;
          }
        }
  
        if (pattern.min && typeof value === "string" && value.length < pattern.min) {
          result.validate = false;
          result.errors.push({
            message: `${fullPropName} should have a minimum length of ${pattern.min}.`,
          });
          continue;
        }
  
        if (pattern.max && typeof value === "string" && value.length > pattern.max) {
          result.validate = false;
          result.errors.push({
            message: `${fullPropName} should have a maximum length of ${pattern.max}.`,
          });
          continue;
        }
  
        // Check if there's a callback defined
        if (pattern.callback) {
          value = pattern.callback(value); // Apply the callback to the value
          obj[prop] = value; // Update the value in the object
        }
  
        result.successes.push(`"${fullPropName}" is valid.`);
      }
    }
  
    // Filter out properties that are undefined after validation
    let validatedData = {};
    for (const prop in obj) {
      if (obj[prop] !== undefined) {
        validatedData[prop] = obj[prop];
      }
    }
  
    return { ...result, data: validatedData };
  }
  
  const refinedObj = refine(abc);
  
  if (refinedObj === null) {
    console.error("Please enter valide value.");
  } else {
    const validationResult = validate(refinedObj, Patterns);
    // console.log(validationResult.data);
    if (!validationResult.validate) {
      console.error("Validation:", validationResult.validate);
      validationResult.errors.forEach((error) => {
        console.error(`error: ${error.message}`);
      });
      console.log("Successes:", validationResult.successes);
    } else {
      console.log("Validation:", validationResult.validate);
      console.log("Successes:", validationResult.successes);
    }
  }
  