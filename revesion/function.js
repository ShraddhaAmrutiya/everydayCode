function greet (name){
    return (`hello ${name} !`)
}

let name ="Shraddha"
console.log(greet(name))
console.log(name.split('').reverse().join(''))

////////////////////////////////////////
function square(a) {
    return a*a
}console.log(square(2))

//////////////////////////////////////
function add(a,f){
    console.log(a+f)
}
add(4,5)
////////////////////////////////////////
function multiply(a,f){
    console.log(a*f)
}
multiply(4,5)
//////////////////////////////////////
function iseven( z ){
  if (z%2===0){
    return true
  } ;
  return false
}
console.log(iseven(4))
/////////////////////////////////////////////////////////////
 function max (x,c){
    if (x<=c ){
        console.log(`${c} is greter then ${x}`)
        
    }else {
        console.log(`${x} is greter then ${c}`)
 }
 }
 max (15,9)

 /////////////////////////////////////////////////////////////

 let greet1 = function (){
    console.log("hello world !")
 }
greet1()
///////////////////////////////////////////////////
let string = 'hello My Name Is Shraddha'
let reverse= function(){
    let v =string.split('').reverse().join('')
    console.log(v)
}
console.log('hello My Name Is Shraddha')
reverse()
//////////////////////////////////////////////////////
let b =(numb) =>{
    console.log(numb*numb)
}
b(4)
//////////////////////////////////////////
let n ="shraddha "
let m= "amrutiya"
let a = ()=>{
    console.log(n.concat(m))
}
a(n,m)
/////////////////////////////////////////////
function applyfunction(func, value){
return func(value)
}
let s =(x)=>x*2
let result= applyfunction(s,78)
console.log(result)
////////////////////////////////////////////
function applyfunction1(func, array){
    return array.map (func);
    }
    let d = (x) => x*2;
    let f =[2, 3, 4, 5, 6,];
    let result1= applyfunction1(d,f)
    console.log(result1)
/////////////////////////////////////////////////
function filterarr(arr, callback){
    return arr.filter(callback);
}
const isEven = (num) => num % 2 === 0;
let g=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
const evenNumber=filterarr(g,isEven)
console.log(evenNumber)
////////////////////////////////////////////////////
function EachElement( arr1 ,callback){
    return arr1.map(callback);
}
let h=[1, 2, 3, 4, 5, 6 ];

let j = (x) =>{ 
      return x*2;}

let result4= EachElement(h,j);
console.log(result4)
///////////////////////////////////////////////////////
function greet2 (name="guest"){
    console.log (`hello ${name} !`)
}
greet2()
greet2("sunidhi :)")
greet2(`shraddha :)`)

////////////////////////////////////////////////|
function multiply(numz="2", numx="3"){
    console.log (numz*numx)
}
multiply()
multiply(5,10)

////////////////////////////////////////////////////|

function sumAll(){
 let sum=0
  for(i=0; i< arguments.length; i++){
    sum+= arguments[i];
  }
  return sum
}
console.log (sumAll(1, 2, 3, 4, 5,6))
console.log (sumAll(1, 2, "5"))
console.log (sumAll(1, 2, "hello"))

// ////////////////////////////////////////////////////////////

function productAll(){
    let product=1
    debugger
    for(i=0; i< arguments.length; i++){
        product *=arguments[i]
    }
    return product
}
console.log(productAll(2, 3, 4, 5))
console.log(productAll(2, 3, 4," 5"))
console.log(productAll(2, 3, "hello"))

///////////////////////////////////////////
function factorial1(n){
    if (n===0){
        return 1
    }
    return n * factorial1 (n-1)
}
console.log(factorial1(4))
console.log(factorial1(34))
console.log(factorial1(10))