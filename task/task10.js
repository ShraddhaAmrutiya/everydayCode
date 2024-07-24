///////Update regex patterns is applicable for array and object present in a given object

let abc = {
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
            active: true
        },
        {
            name: "         null                      ",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
            money: 98,
            active: "true"
        },
        {
            name: "sdf hgf",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
            money: 98,
            active: true,
            test: {
                catchPhraset: "v bdjbffd nd sjlbc af",
            }
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
    id: {type:"string",regex:/^\d+$/,range:[1,10],min:10,max:10,callBack:(id)=>{
        console.log()
    }},
    name: /^[A-Za-z']+ [A-Za-z]+$/,
    active: /^(true|false)$/,
    username: /^[A-Za-z']+$/,
    email: /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in|biz)$/,
    street: /^[a-zA-Z0-9'()\s&#.,-]{1,15}$/,
    suite: /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/,
    city: /^[a-zA-Z\s'-]+$/,
    zipcode: /^\d{5}-\d{4}$/,
    lat: /[-+]?\d*\.\d+/,
    lng: /[-+]?\d*\.\d+/,
    phone: /^(\d{1,3})-(\d{3})-(\d{3})-(\d{4}) x(\d+)$/,
    catchPhrase: /^[\w\s'"\-,.:;!]+$/,
    bs: /^[\w\s'-]+$/,
    website: /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(?:\/.*)?$/,
    address: {
        street: /^[a-zA-Z0-9'()\s&#.,-]{1,100}$/, 
        suite: /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/, 
        city: /^[a-zA-Z\s'-]+$/,
        zipcode: /^\d{5}-\d{4}$/,
        geo: {
            lat: /[-+]?\d*\.\d+/,
            lng: /[-+]?\d*\.\d+/,
        },
    },
    local_location: {
        name: /^[A-Za-z\s]+$/,
        catchPhrase: /^[\w\s'"\-,.:;!]+$/,
        bs: /^[\w\s'-]+$/,
        money: /^\d+$/,
        active: /^(true|false)$/,
        test: {
            catchPhraset: /^[\w\s]+$/,
        }
    },
    company: {
        name: /^[A-Za-z\s'-]+$/, 
        catchPhrase: /^[\w\s'"\-,.:;!]+$/, 
        bs: /^[\w\s'-]+$/,
    }
  };
  
  function refine(obj) {
    function checkAndTrim(value, path) {
        if (typeof value === 'string') {
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
  
        if (typeof value === 'object') {
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
  
    let refinedObj = checkAndTrim(obj, 'obj');
    if (refinedObj === false) {
        return null;
    }
  
    return refinedObj;
  }

  function validate(obj, Patterns, parentKey = '') {
    let result = {
        validate: true,
        errors: [],
        successes: []
    };
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            const fullPropName = parentKey ? `${parentKey}.${prop}` : prop;
  
            if (obj[prop] === null || obj[prop] === undefined || obj[prop] === "") {
                result.validate = false;
                result.errors.push(`${fullPropName} is null, undefined, or blank.`);
            } else if (Patterns[prop]) {
                if (typeof Patterns[prop] === 'object' && !(Patterns[prop] instanceof RegExp)) {
                    if (Array.isArray(obj[prop])) {
                        for (let i = 0; i < obj[prop].length; i++) {
                            const nestedResult = validate(obj[prop][i], Patterns[prop], `${fullPropName}[${i}]`);
                            if (!nestedResult.validate) {
                                result.validate = nestedResult.validate;
                                result.errors = result.errors.concat(nestedResult.errors);
                                return result;  
                            }
                            result.successes = result.successes.concat(nestedResult.successes);
                        }
                    } else {
                        const nestedResult = validate(obj[prop], Patterns[prop], fullPropName);
                        if (!nestedResult.validate) {
                            result.validate = nestedResult.validate;
                            result.errors = result.errors.concat(nestedResult.errors);
                            return result;  
                        }
                        result.successes = result.successes.concat(nestedResult.successes);
                    }
                } else if (Patterns[prop] instanceof RegExp) {
                    if (!Patterns[prop].test(String(obj[prop]))) {
                        result.validate = false;
                        result.errors.push(`${fullPropName} is invalid.`);
                        return result;  
                    } else {
                        result.successes.push(`${fullPropName} is valid.`);
                    }
                } else {
                    throw new Error(`${fullPropName} has an invalid pattern type in Patterns.`);
                }
            } else {
                throw new Error(`${fullPropName} does not have a defined pattern in Patterns.`);
            }
        }
    }
  
    return result;
  }
  
  
  const refinedObj = refine(abc);
  
  if (refinedObj === null) {
      console.error('please enter valid value');
  } else {
      const validationResult = validate(refinedObj, Patterns);
     
      console.log('Valid:', validationResult.validate);
      console.log('Errors:', validationResult.errors);
      console.log('Successes:', validationResult.successes);
  }
  