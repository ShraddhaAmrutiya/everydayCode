//////////////////make two dynamic function that verify the any object /////////////////////////////

// const Patterns = {
//     type: /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/,
// //     id: /^\d+$/,
// //     title: /^[a-zA-Z0-9'()\s&#.!:,-]{1,100}$/,
// //     url: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/, // Pattern for URLs
//     // commentType: /^[a-zA-Z]+$/

//  name : /^[A-Za-z']+ [A-Za-z]+$/,
//  email : /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in|biz)$/,
//  age:/^\d{1,2}$/,
//  city: /^[a-zA-Z\s'-]+$/,
//  country: /^[a-zA-Z\s'-]+$/,
//  password : /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^.-=+<>?&*()]).{8,15}$/,
//  phone : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
//  string:/^[a-zA-Z0-9'()\s&#.,-]{1,30}$/,
//  website1 : /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/,
//  colour:/^[a-zA-Z]{4,6}$/,
//  arrayOfStrings: /^[a-zA-Z\s]*$/,
// //  website = /^(https:\/\/|www\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/;
//  website : /^(https?:\/\/)?(www\.[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[a-zA-Z0-9._~:/?#@!$&'()*+,;=]*)?$/,

// };

// for object abc
const Patterns = {
  id: /^\d+$/,
  name: /^[A-Za-z']+ [A-Za-z]+$/,
  username: /^[A-Za-z']+$/,
  email: /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+\.(?:com|in|biz)$/,
  street: /^[a-zA-Z0-9'()\s&#.,-]{1,15}$/,
  suite: /^[a-zA-Z0-9'()\s&#.,-]{1,30}$/,
  cityRegex: /^[a-zA-Z\s'-]+$/,
  zipcode: /^\d{5}-\d{4}$/,
  lat: /[-+]?\d*\.\d+/,
  lag: /[-+]?\d*\.\d+/,
  phone: /^(\d{1,3})-(\d{3})-(\d{3})-(\d{4}) x(\d+)$/,
  catchPhrase: /^[\w\s'"\-,.:;!]+$/,
  bs: /^[\w\s'-]+$/,
  website:
    /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(?:\/.*)?$/,
  city: /^[a-zA-Z\s'-]+$/,
};

/////for obj  xyz
// const Patterns={
//     userId: /^\d{1,4}$/,
//     id: /^\d{1,4}$/,
//     title:/^[\w\s'-]+$/,
//     body:/^[\w\s'-]+$/
// }

// ////////    for obj efg
// const Patterns={
//     type:/^[\w\s'-]+$/,
//     id: /^\d{1,4}$/,
//     title:/^[a-zA-Z'0-9:()\s&"#.!,-]{1,30}$/,
//     self:/^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(?:\/.*)?$/,
//     related:/^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(?:\/.*)?$/,
// }

function refine(obj) {
  const refinedObj = {};

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === "string") {
        refinedObj[prop] = obj[prop].trim();
      } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
        if (Array.isArray(obj[prop])) {
          refinedObj[prop] = obj[prop].map((item) =>
            typeof item === "string" ? item.trim() : refine(item)
          );
        } else {
          refinedObj[prop] = refine(obj[prop]);
        }
      } else {
        refinedObj[prop] = obj[prop];
      }
    }
  }

  return refinedObj;
}

function validateWithPatterns(obj, patterns, parentKey = "") {
  const result = {
    validate: true,
    errors: [],
    successes: [],
  };

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const fullPropName = parentKey ? `${parentKey}.${prop}` : prop;
      if (obj[prop] === null || obj[prop] === undefined || obj[prop] === "") {
        result.validate = false;
        result.errors.push(`${fullPropName} is null, undefined, or blank.`);
        return result;
      } else if (patterns[prop]) {
        if (!patterns[prop].test(obj[prop])) {
          result.validate = false;
          result.errors.push(`${fullPropName} is invalid.`);
          return result;
        } else {
          result.successes.push(`${fullPropName} is valid.`);
        }
      } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
        if (Array.isArray(obj[prop])) {
          for (let i = 0; i < obj[prop].length; i++) {
            const nestedResult = validateWithPatterns(
              obj[prop][i],
              patterns,
              `${fullPropName}[${i}]`
            );
            if (!nestedResult.validate) {
              result.validate = nestedResult.validate;
              result.errors = result.errors.concat(nestedResult.errors);
              return result;
            }
            result.successes = result.successes.concat(nestedResult.successes);
          }
        } else {
          const nestedResult = validateWithPatterns(
            obj[prop],
            patterns,
            fullPropName
          );
          if (!nestedResult.validate) {
            result.validate = nestedResult.validate;
            result.errors = result.errors.concat(nestedResult.errors);
            return result;
          }
          result.successes = result.successes.concat(nestedResult.successes);
        }
      } else {
        result.successes.push(`${fullPropName} is valid.`);
      }
    }
  }

  return result;
}

let abc = {
  id: 1,
  name: " Leanne Graham",
  name1: "",
  username: "Bret",
  email: "sincere35@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  local_location: [
    {
      name: "Romaguera Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
      money:98,
        active:true
    },
    {
      name: "Romaguera Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
      money:98,
      active:"true"

    },
    {
      name: "sdf",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
      money:98,
      active:true,
      test:{
        catchPhraset: "",
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
let xyz = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};

let efg = {
  type: "articles",
  id: 1,
  attributes: {
    title: "API paints my bikeshed!",
  },
  relationships: {
    author: {
      links: {
        self: "http://example.com/articles/1/relationships/author",
        related: "http://example.com/articles/1/author",
      },
      data: { type: "people", id: 9 },
    },
    comments: {
      links: {
        self: "http://example.com/articles/1/relationships/comments",
        related: "http://example.com/articles/1/comments",
      },
      data: [
        { type: "comments", id: 5 },
        { type: "comments", id: 12 },
      ],
    },
  },
  links: {
    self: "http://example.com/articles/1",
  },
};

const refinedObj = refine(abc);
// console.log(JSON.stringify(refinedObj));
// const refinedObj = refine(xyz);
// const refinedObj = refine(efg);
// console.log(refinedObj);
const validationResult = validateWithPatterns(refinedObj, Patterns);

console.log("validate:", validationResult.validate);
console.log("errors:", validationResult.errors);
console.log("successes:", validationResult.successes);
