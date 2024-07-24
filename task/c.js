const abc = {
    id: 1,
    name: " Leanf asdfg ",
    username: "Bret",
    email: "Asincere35@april.biz",
    address: {
      street: "Kulas Light",
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
        name: "         null                      ",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
        money: 98,
        active: "true",
      },
      {
        name: "sdf hgf",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
        money: 98,
        active: true,
        test: {
          catchPhraset: "v bdjbffd nd sjlbc af",
        },
      },
    ],
    phone: "1-770-736-8031 x56442",
    website: "www.hildegard.org",
    company: {
      name: "Romaguera Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  
  const Patterns = {
    id: { type: Number, regex: /^\d+$/, range: [1, 20] },
    name: { type: String, regex: /^[A-Za-z\s']+ [A-Za-z\s']+$/, min: 3, max: 30 },
    username: { type: String, regex: /^[A-Za-z']+$/, min: 3, max: 20 },
    email: { type: String, regex: /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in|biz)$/, min: 5, max: 50 },
    address: {
      type: Object,
      nested: {
        street: { type: String, regex: /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/, min: 3, max: 30 },
        suite: { type: String, regex: /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/, min: 1, max: 30 },
        city: { type: String, regex: /^[a-zA-Z\s'-]+$/, min: 1, max: 23 },
        zipcode: { type: String, regex: /^\d{5}-\d{4}$/, min: 10, max: 10 },
        geo: {
          type: Object,
          nested: {
            lat: { type: Number, regex: /^-?\d+(\.\d+)?$/, min: -90, max: 90 },
            lng: { type: Number, regex: /^-?\d+(\.\d+)?$/, min: -180, max: 180 },
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
          catchPhrase: { type: String, regex: /^[\w\s'"\-,.:;!]+$/, min: 1, max: 100 },
          bs: { type: String, regex: /^[\w\s'-]+$/, min: 1, max: 100 },
          money: { type: Number, regex: /^\d+$/, min: 1, max: 100 },
          active: { type: Boolean },
          test: {
            optional: true,
            nested: {
              catchPhraset: { type: String, regex: /^[\w\s]+$/, min: 1, max: 50 },
            },
          },
        },
      },
    },
    phone: { type: String, regex: /^(\d{1,3})-(\d{3})-(\d{3})-(\d{4}) x(\d+)$/, min: 10, max: 20 },
    website: { type: String, regex: /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/.*)?$/, min: 5, max: 50 },
    company: {
      type: Object,
      nested: {
        name: { type: String, regex: /^[A-Za-z\s'-]+$/, min: 3, max: 30 },
        catchPhrase: { type: String, regex: /^[\w\s'"\-,.:;!]+$/, min: 1, max: 100 },
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
        console.error(`Error at ${path}: it is undefined, null, or an empty string`);
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
    if (!obj || typeof obj !== 'object') {
      return {
        validate: false,
        errors: [{ message: `Object is null or not an object.` }],
        successes: [],
      };
    }
  
    let result = {
      validate: true,
      errors: [],
      successes: [],
    };
  
    for (const prop in patterns) {
      if (!patterns.hasOwnProperty(prop)) {
        continue;
      }
  
      const fullPropName = parentKey ? `${parentKey}.${prop}` : prop;
      const pattern = patterns[prop];
      const value = obj[prop];
  
      if (value === undefined) {
        if (!pattern.optional) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} is undefined.` });
          break;
        }
        continue;
      }
  
      if (pattern.type === Object && pattern.nested) {
        if (typeof value !== "object" || value === null) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be an Object.` });
          break;
        }
  
        const nestedValidation = validate(value, pattern.nested, fullPropName);
        if (!nestedValidation.validate) {
          result.validate = false;
          result.errors.push(...nestedValidation.errors.map((error) => ({ message: error.message })));
          break;
        } else {
          result.successes.push(`"${fullPropName}" is valid.`);
        }
      }
  
      if (pattern.type === Array && pattern.of && pattern.of.type === Object && pattern.of.nested) {
        if (!Array.isArray(value)) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be an Array.` });
          break;
        }
  
        for (let i = 0; i < value.length; i++) {
          const arrayValidation = validate(value[i], pattern.of.nested, `${fullPropName}[${i}]`);
          if (!arrayValidation.validate) {
            result.validate = false;
            result.errors.push(...arrayValidation.errors.map((error) => ({ message: error.message })));
            break;
          } else {
            result.successes.push(`"${fullPropName}[${i}]" is valid.`);
          }
        }
  
        if (!result.validate) {
          break;
        }
      }
  
      if (pattern.type !== Object && pattern.type !== Array && pattern.nested === undefined) {
        if (pattern.type && typeof value !== pattern.type.name.toLowerCase()) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be of type ${pattern.type.name}.` });
          break;
        }
  
        if (pattern.regex && !pattern.regex.test(value)) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} is invalid.` });
          break;
        }
  
        if (pattern.range) {
          const [min, max] = pattern.range;
          if (value < min || value > max) {
            result.validate = false;
            result.errors.push({ message: `${fullPropName} should be between ${min} and ${max}.` });
            break;
          }
        }
  
        if (pattern.min && typeof value === "string" && value.length < pattern.min) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be at least ${pattern.min} characters long.` });
          break;
        }
  
        if (pattern.max && typeof value === "string" && value.length > pattern.max) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be at most ${pattern.max} characters long.` });
          break;
        }
  
        result.successes.push(`"${fullPropName}" is valid.`);
      }
    }
  
    return result;
  }
  
  const refinedObject = refine(abc);
 
  
  if (refinedObject) {
    const validationResult = validate(refinedObject, Patterns);
    console.log("Validation Result:", validationResult);
  } else {
    console.error("Please enter valide value.");
  }
  