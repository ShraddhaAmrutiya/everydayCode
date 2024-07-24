// //if... else

// let num=6
// function ifelse (num){
//     if (num>0){
//         console.log(`num ${num} isd greater then 0`)
//     } else if (num<0){
//         console.log ("less then 0")
//     }else 
//     {console.log("number is 0")}

// }
// ifelse(num)



// let a=9
// function b (a){
//     if(a%2===0){
//         console.log(`number ${a} is even number`)
//     }
//     else {
//         console.log(`number ${a} is odd number`)
//     }
// }
// b(a)


// num2=544
// num3=5578
// num1=36
// let num1 = parseFloat(prompt("Enter first number:"));
// let num2 = parseFloat(prompt("Enter second number:"));
// let num3 = parseFloat(prompt("Enter third number:"));

// function find (num1, num2, num3){
//     if(num1>=num2){
//         console.log(`${num1} is grater then ${num2} & ${num3}`)
//     }else if (num2>=num3){
//         console.log(`${num2} is grater then ${num1} & ${num3}`)
//     }else {
//         console.log(`${num3} is grater then ${num1} & ${num2}`)
//     }


// }
// find(num1, num2, num3)



// // switch case
// function days(dayOfWeek){
//     switch (dayOfWeek){
//         case 0:
//             console.log("sunday")
//             break;
//         case 1:
//             console.log("monday")
//             break;
//         case 2:
//             console.log("tuesday")
//             break;
//         case 3:
//             console.log("wednesday")
//             break;
//         case 4:
//             console.log("thursday")
//             break;
//         case 5:
//             console.log("friday")
//             break;
//         case 6:
//             console.log("saturday")
//             break;
//         defult:
//             console.log("no day")
//     }
// }let dayOfWeek = new Date().getDay()

// days(dayOfWeek)

// function getLetterGrade(numericGrade) {
//     let letterGrade;

//     // Converting numeric grade to a range for the switch statement
//     let gradeRange = Math.floor(numericGrade / 10);

//     switch (gradeRange) {
//         case 10: // For grades 100
//         case 9:
//             letterGrade = 'A';
//             break;
//         case 8:
//             letterGrade = 'B';
//             break;
//         case 7:
//             letterGrade = 'C';
//             break;
//         case 6:
//             letterGrade = 'D';
//             break;
//         case 5:
//         case 4:
//         case 3:
//         case 2:
//         case 1:
//         case 0:
//             letterGrade = 'F';
//             break;
//         default:
//             letterGrade = 'Invalid grade';
//     }

//     return letterGrade;
// }

// // Example usage:
// let numericGrade =10
// let letterGrade = getLetterGrade(numericGrade);
// console.log("The letter grade is: " + letterGrade);



// //for loop
// let x=9
// for (i=x;i<=10;i++){
//     console.log (i)
// }

// let n=5
// function factorial (n){
//     factorial=1

//  for (i=1;i<=n;i++){
//     factorial *= i

// }
// return factorial
// }
// console.log(factorial(n))



// let arr=[ 1, 2, 3, 4, 5, 6, 7, 8, 9];

// for(let i = 0 ; i <arr.length; i++){
//     // console.log(arr[i]);
// }


// let i=1
// while(i<=5){
//     console.log(i)
//     i++
// }


// var a=0
    // b=1
    // for (i=0; i<=3;i++){
    //     let temp=a+b
    //     a=b;
    //     b=temp 
    //     console.log(temp)
    // }

    // let i=0
    // while(i<=3){
    //     i++
    //     let temp=a+b
    //     a=b;
    //     b=temp 
    //     console.log(temp)
    // }

    // let j=1
    // do{
    //     console.log(j)
    //     j++
    // }
    // while (j<=5)


        // let number=3
        // do {
        //     console.log ("yes");
        //     number++
        // } while
        
        // (isNaN(number) || number < 1 || number > 20);
        




    //     let number="sdf"


    // if (isNaN(number) || number < 1 || number > 20) {
    //     console.log ("yes");
    // }else{
    //   console.log("no")
    // }
        

    //break 

//     let arr = [23, 45, 78, 89, "hello", true, "56", 88, 14];
// let target = "56"
// let index = -1
// debugger
//     for(i=0;i<=arr.length;i++){
//         if (arr[i] === target){
//             index=i
//             break;
//         }
//     }

//     if (index !== -1) {
//         console.log(`Found at position ${index}`);
//     } else {
//         console.log('Not found');
    // }



    //continue

    // for (let i=1; i<=10; i++){
    //     if(i%2===0){
    //         continue;
    //     }
    //     console.log(i)
    // }



    // /////nested loop


    // function multiplyAll(arr) {
    //     debugger
    //     let product = 1;
    //     for (let i = 0; i < arr.length; i++) {
    //       for (let j = 0; j < arr[i].length; j++) {
    //         product *= arr[i][j]; 
    //       }
    //     }
    //     return product;
    //   }
      
    //   const result = multiplyAll([[1, 2], [3, 4], [5, 6, 7]]);
    //   console.log(result);
      

    /////find prime number

// function isprime(n){
//     if (n<2){
//         console.log(`${n} is not prime number`)
            
//     }
//     for (let i=2; i<Math.sqrt(n) ;i++){

//         if (n%i === 0){
//             console.log(`${n} is not prime number`)
                
//         }
      
//     }
//     console.log(`${n} is prime number`)
// }
// let n =13;
// isprime(n);



//// find 1 to 100 prime number

// function demo(){
//     var num=100
//     var isprime;
// for (let i=2;i<=num; i++){
//     isprime=1;
//     for(var j=2; j<=i/2; j++){
//         if (i%j === 0){
//             isprime=0
//             break;
//     //  console.log(`${n} is not prime number`)

//     }
// }
//     if (isprime==1){
//         console.log(i)
//     }
// }}

// demo()

////leap year

// function leapyear(year ){
//     // if (year % 400 === 0)
//     (year%100 !== 0 && year%4 === 0)
//         {
//         return true
//         // break;
//     }
    // return false
// }
// 
// let year =2012
// if (leapyear(year)) {
//     console.log(year + ' is a leap year.');
// } else {
//     console.log(year + ' is not a leap year.');
// }


////reverse string 

// let string ="My name is Shraddha."
// let newstring = '';
// for (i=string.length-1; i>=0 ; i--){
//     newstring += string[i]
// }
// console.log(newstring)

// let w=(string.split('').reverse().join(''))
// console.log(w)

// let g=([...string].reverse().join(''))
// console.log(g)



////Error Handling:

// function exampleFunction() {
//     try {
        
//         let x = 10 / 2;  
//         console.log('Result:', x);  
//     } catch (error) {
//         console.error('Error caught:', error.message);
//     } finally {
//         console.log('Execution completed.');
//     }
// }
// exampleFunction();

//////////////---------------------------------//////////////////////////////


// function input (num, min, max) {
//     if (isNaN(num)){
//         throw new Error("invelid input.")
//     }
//     if(num<min || num> max){
//         throw new Error("please enter velid input.")
//     }
//     // return num
//     console.log(num)
// }
//  input(5,4,6)
// //   console.log(input)
//   try {
//     let result = input(300, 4, 6);
//     console.log(`Valid input: ${result}`);
// } catch (error) {
//     console.error(error.message);
// }

///////////////////--------------------------------------------------------/////////////////////
/////////////////////function call

// function areaofcircle (redious){
//     return Math.PI * redious *redious
// }
// console.log(areaofcircle(3))

// function areaofrectengle (base , hight){
//     return 0.5*base * hight

// }
//   function areaofsquare (l , b){
//     return l* b 
//   }

//   console.log(areaofrectengle(5,6))
//   console.log(areaofsquare(5,6))

  /////////////////////////////////-------------------------------------------//////////////////////////////
  let a = 3
  let b=2
  function aditio (a,b){
    return a+b
  }
  function sub (a,b){
    return a-b
  }
  function multi (a,b){
    return a*b
  }
  function div (a,b){
    return a/b
  }
  function rem (a,b){
    console.log( a%b)
  }

  

 console.log( aditio(a, b)) 
 console.log(sub (a,b))
 console.log(multi (a,b))
 rem(a, b)