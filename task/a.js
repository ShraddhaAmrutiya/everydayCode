//////shorter version of task11
const abc = {
    id: 1,
    name: "asd dfg ",
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
        money: 78,
        active: true,
      },
    ],
    phone: "1-770-736-8031 x5644",
    website: "www.hildegard.org.",
    company: {
      name: "asdf ghjk",
      number: "1234567890",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
const Patterns = {
    id: { type: Number, regex: /^\d+$/, range: [1, 20] },
    name: { type: String, regex: /^[A-Za-z]{1,15} [A-Za-z]{1,15}$/, min: 3, max: 30 },
    username: { type: String, regex: /^[\w']+$/, min: 3, max: 20 },
    email: { type: String, regex: /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in|biz)$/ },
    address: {
      type: Object,
      nested: {
        street: { type: String, regex: /^[a-zA-Z\s0-9]+$/, min: 3, max: 30 },
        suite: { type: String, regex: /^[a-zA-Z0-9'()\s&#.,-]+$/, min: 1, max: 30 },
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
          test: { optional: true, catchPhraset: { type: String, regex: /^[\w\s]+$/, min: 1, max: 50 } },
        },
      },
    },
    phone: { type: String, regex: /^(\d{1,3})-(\d{3})-(\d{3})-(\d{4}) x(\d+)$/, min: 10, max: 20 },
    website: { type: String, regex: /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9./]+$/, min: 5, max: 50 },
    company: {
      type: Object,
      nested: {
        name: { type: String, regex: /^[A-Za-z\s]+$/, min: 3, max: 30 },
        number: { type: String, regex: /^\d+$/, min: 1, max: 10 },
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
        console.error(` ${path} it is undefined, null, or empty .`);
        return false;
      }
  
      if (Array.isArray(value)) {
        return value.map((v, i) => checkAndTrim(v, `${path}[${i}]`));
      }
  
      if (typeof value === "object") {
        const newObj = {};
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            newObj[key] = checkAndTrim(value[key], `${path}.${key}`);
          }
        }
        return newObj;
      }
  
      return value;
    }
  
    const refinedObj = checkAndTrim(obj, "obj");
  
    return refinedObj === false ? null : refinedObj;
  }
  
  function validate(obj, patterns, parentKey = "") {
    const result = { validate: true, errors: [], successes: [] };
  
    for (const prop in patterns) {
      if (!patterns.hasOwnProperty(prop)) continue;
  
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
          result.successes.push(`"${fullPropName}" is valide.`);
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
            result.successes.push(`"${fullPropName}[${i}]" is valide.`);
          }
        }
  
        if (!result.validate) {
          break;
        }
      }
  
      if (pattern.type !== Object && pattern.type !== Array && pattern.nested === undefined) {
        if (pattern.type && typeof value !== pattern.type.name.toLowerCase()) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should be of type ${pattern.type.name.toLowerCase()}.` });
          break;
        }
  
        if (pattern.regex && !pattern.regex.test(value)) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} is invalid.` });
          break;
        }
  
        if (pattern.range && typeof value === "number") {
          const [min, max] = pattern.range;
          if (value < min || value > max) {
            result.validate = false;
            result.errors.push({ message: `${fullPropName} should be between ${min} and ${max}.` });
            break;
          }
        }
  
        if (pattern.min && typeof value === "string" && value.length < pattern.min) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should have a minimum length of ${pattern.min}.` });
          break;
        }
  
        if (pattern.max && typeof value === "string" && value.length > pattern.max) {
          result.validate = false;
          result.errors.push({ message: `${fullPropName} should have a maximum length of ${pattern.max}.` });
          break;
        }
  
        result.successes.push(`"${fullPropName}" is valid.`);
  
        if (!result.validate) {
          break;
        }
      }
    }
  
    return result;
  }
  
  const refinedObj = refine(abc);
  
  if (refinedObj === null) {
    console.error("Please enter valid values.");
  } else {
    const validationResult = validate(refinedObj, Patterns);
  
    if (!validationResult.validate) {
      console.error("Validation: false");
      console.log("Successes:", validationResult.successes);
      validationResult.errors.forEach((error) => {
        console.error(`Error: ${error.message}`);
      });
    } else {
      console.log("Validation: true");
      console.log("Successes:", validationResult.successes);
    }
  }
  