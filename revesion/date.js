let today=new Date()
// let date=(today.getDate()+ "/"+today.getMonth()+"/"+ today.getFullYear())
// console.log(today.getDate())
// console.log(today.getMonth()+1)
// console.log(today.getFullYear()) 
// console.log(today.getDay())
// let today = new Date();
let dayOfWeek = today.getDay(); // Returns a number between 0 and 6 (0 is Sunday, 6 is Saturday)

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log("Today is: " + days[dayOfWeek]);

