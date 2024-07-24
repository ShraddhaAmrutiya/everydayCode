// function test() {
//     let a = 1;
//     if (true) {
//       let a = 2;
//       console.log(a);
//     }
//     console.log(a);
//   }
//   test();
  
//   function test() {
//     var a = 1;
//     if (true) {
//       var a = 2;
//       console.log(a);
//     }
//     console.log(a);
//   }
//   test();
  

// function person (name,age){
//   let _name=name,
//      _age=age;

//   this.get= function(){
//     return `my name is ${name} & my age is${age}`
  
//   };
   
//   this.set=function(newperson){
//     let[newname,newage]=newperson. split(',');
//     _name=newname.trim(),
//     _age=parseInt(newage.trim())

  
// }
// }
// let person1=new person("shraddha",24)
// console.log(person1.get())

// person1.set("sunidhi,45 ")
// console.log(person1.set())




// function Person(name, age) {
//   let _name = name;
//   let _age = age;

//   this.get = function() {
//       return `My name is ${_name} & my age is ${_age}`;
//   };

//   this.set = function(newPerson) {
//       let [newName, newAge] = newPerson.split(',');
//       _name = newName.trim();
//       _age = parseInt(newAge.trim());
//   };
// }

// let person1 = new Person("shraddha", 24);
// console.log(person1.get()); // Output: My name is shraddha & my age is 24

// person1.set("sunidhi, 45");
// console.log(person1.get()); // Output: My name is sunidhi & my age is 45




 function person (name,age){
  let _name=name;
  let  _age=age;

  this.get= function(){
    return `my name is ${_name} & my age is${_age}`
  
  };
   
  this.set=function(newperson){
    let[newname,newage]=newperson.split(',');
    _name=newname.trim(),
    _age=parseInt(newage.trim())

  
};
}
let person1=new person("shraddha",24)
console.log(person1.get())

person1.set("sunidhi, 45")
console.log(person1.get())
