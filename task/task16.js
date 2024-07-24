////// required use in validation 

const abc = {
    id: 1,
    name: "asd dfg",
    username: "Bret",
    age:60,
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
    age: {
        required: true,
        type: Number,
        regex: /^\d+$/,
        min: 1,
        max: 90,
        callback: (value) => {
          if (value <=18) {
            throw new Error("Age must be at least 18.");
          }else if(value >=100){
            throw new Error("age limit is 100")
          }
          return value;
        },
      },
      email: {
        required: true,
        type: String,
        regex: /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in|biz)$/,
        min: 8,
        max: 30,
      },
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
        console.error(
          `Error at ${path}: it is undefined, null, or an empty string`
        );
        return false;
      }
  
      if (Array.isArray(value)) {
        let newArray = [];
        for (let i = 0; i < value.length; i++) {
          let refinedValue = checkAndTrim(value[i], `${path}[${i}]`);
          if (refinedValue === false) {
            return false;
          }
          newArray.push(refinedValue);
        }
        return newArray;
      }
  
      if (typeof value === "object") {
        let newObj = {};
        for (let key in value) {
          if (value.hasOwnProperty(key)) {
            let refinedValue = checkAndTrim(value[key], `${path}.${key}`);
            if (refinedValue === false) {
              return false;
            }
            newObj[key] = refinedValue;
          }
        }
        return newObj;
      }
  
      return value;
    }
  
    let refinedObj = checkAndTrim(obj, "obj");
    if (refinedObj === false) {
      return null;
    }
  
    return refinedObj;
  }
  
  function validate(obj, patterns, parentKey = "") {
    let result = {
      validate: true,
      errors: [],
      successes: [],
      data:null
    };
  
    for (const prop in patterns) {
  
      const fullPropName = parentKey ? `${parentKey}.${prop}` : prop;
      const pattern = patterns[prop];
      const value = obj[prop];


    //   if (pattern.required && (value === undefined || value === null)) {
    //     result.validate = false;
    //     result.errors.push({ message: `${fullPropName} is required.` });
    //     continue;
    //   }
        
    if (pattern.required && (value === undefined || value === null)) {
      result.validate = false;
      result.errors.push({ message: `${fullPropName} is required.` });
      continue;
    }
       
  
      // if the property exists in the object
      if (value === undefined) {
        if (!pattern.optional) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} is undefined.` });
          break;
        }
        continue;
      }
  
      // Validate nested objects
      if (pattern.type === Object && pattern.nested) {
        if (typeof value !== "object" || value === null) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be an Object.` });
          break;
        }
  
        const nestedValidation = validate(value, pattern.nested, fullPropName);
        if (!nestedValidation.validate) {
          result.validate = false;
          result.errors.push(
            ...nestedValidation.errors.map((error) => ({
              message: error.message,
            }))
          );
          break;
        } else {
          result.successes.push(`"${fullPropName}" is valide.`);
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
          break;
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
            break;
          } else {
            result.successes.push(`"${fullPropName}[${i}]" is valide.`);
          }
        }
  
        // Check for the first error and stop success messages
        if (!result.validate) {
          break;
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
          break;
        }
  
        if (pattern.regex && !pattern.regex.test(value)) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} is invalid .` });
          break;
        }
  
        if (pattern.range && typeof value === "number") {
          const [min, max] = pattern.range;
          if (value < min || value > max) {
            result.validate = false;
            result.errors.push({
              message: `${fullPropName} should be between ${min} and ${max}.`,
            });
            break;
          }
        }
  
        if (
          pattern.min &&
          typeof value === "string" &&
          value.length < pattern.min
        ) {
          result.validate = false;
          result.errors.push({
            message: `${fullPropName} should have a minimum length of ${pattern.min}.`,
          });
          break;
        }
  
        if (
          pattern.max &&
          typeof value === "string" &&
          value.length > pattern.max
        ) {
          result.validate = false;
          result.errors.push({
            message: `${fullPropName} should have a maximum length of ${pattern.max}.`,
          });
          break;
        }
  
        // check if callback
        if (pattern.callback) {
          // console.log("0000000000000000000000000");
          obj[prop] = pattern.callback(obj[prop])
        }
        result.successes.push(`"${fullPropName}" is valide .`);
  
        if (!result.validate) {
          break;
        }
      }
    }

    return {...result,data:obj};
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
  