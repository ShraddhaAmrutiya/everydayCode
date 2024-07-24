// // let person={
// //     name : "shraddha",
// //     age:24,
// //     gender : "female",
// //     greet : function(){console.log(`hello my name is ${this.name} .`)}
    
// // }
// // person.greet()

// // person.age=30

// // person.address= "rajkot"

// // delete person.gender

// // console.log(person)


// /////////////////////////////////////////

// // let car ={
// //     make : "hudai",
// //     model : "nios",
// //     year: 2021
// // }
// // console.log(car.model)


// /////////////////////////////////////////////////

// // let student ={
// //     // name:"qwerrt",
// //     age: 12,
// //     address:{
// //         street:"asdf0",
// //         city :"bvgbf",
// //         zipcode:"456789"
// //     }
// // }

// // //////////////////////////////////////////////

// // function per(name , age){
// // this.name=name 
// // this.age =age
// // }
// // // let per1 =new per('dffef',34);
// // // console.log(per1);
// // // console.log(new per('dfdsadef',24));



// // ///////////////////////////////////////////

// // per.prototype.sayhello=function(){
// //     console.log(`hello my name is ${this.name} .`)
// // }
// // let per5=new per("shraddha",24)
// // console.log(per5.sayhello())



// class man {
//     constructor(name ,age ){
//         this.name= name;
//         this.age=age;
//     }
//     sayHello(){
//         console.log(`hello, my name is ${this.name} and I am ${this.age } year old `)
//     }
// }
// let man1 = new man ("shraddha",24)
// man1.sayHello()

// class user{
//     constructor(fname,lname){
//         this.fname=fname;
//         this.lname=lname
//     }

//     get fullname(){
//         return `my name is ${this.fname} ${this.lname} .`}

//         set fullName(value) {
//             let parts = value.split(' ');
//             this.firstName = parts[0];
//             this.lastName = parts[1];
//         }
    
// }
// let user1=new user("shraddha", "bhuva")
// console.log(user1.fullname)

// user1.fullName = "Jane Smith";
// console.log(user1.firstName); 
// console.log(user1.lastName);


////////////////////////////////////////////////////////////////////////


// function person34(name,age){
//     let _name=name;
//     let _age =age;

//     this.getname= function(){
//         return  _name
//     }
//     this.getage=function(){
//         return `my age is ${_age}`
//     }

//     this.setname=function(newname){
//         _name =newname ;

//     }
//     this.setage= function(newage){
//         _age=newage ;
//     }
// }

// let person35=new person34("rutvij",29);
// console.log(person35.getname())
// console.log(person35.getage())


// person35.setname("RUTVIJ")
// person35.setage(29)
// ////////////////////////////////////////////////////////////////////////////

// let person={
//         name : "shraddha",
//         age:24,
//         gender : "female",
//         greet : function(){console.log(`hello my name is ${this.name} .`)}
        
//     }

//     person.sayhi = function(){
//       console.log(`hii my name is ${this.name} .`)
//     }
//     person.sayhi()
//     person.name="sunidhi"
//     person.sayhi()

// ///////////////////////////////////////////////////////////////////////////////////
// function person3(name,age){
//             this.name= name;
//             this.age=age;
//         }
//     function employee(name,age,jobtitle){
//         person3.call(this,name,age
//         )
//         this.jobtitle=jobtitle
//     }
//     employee.prototype=Object.create(person3.prototype)

//     let employee1= new employee ("shraddha",24,"developer")
//     console.log(employee1);
//     console.log(`my name is ${employee1.name} , my age is ${employee1.age} and I  am ${employee1.jobtitle}`)
    
//     ///////////////////////////////////////////////////////////////////////

//     class person5{
//         constructor(namee,agee)
//         {this.namee=namee,
//             this.agee=agee
//         }
//         greet() { // Method definition
//             console.log(`Hello, my name is ${this.namee} , I am ${this.agee} year old.`);
//         }
//     }
    
//     person6= new person5("SHRADDHA",24)
//     person6.greet()

//     ////////////////////////////////////////////////////////////

//     class user{
//         constructor(fname,lname)
//         {
//             this.fname=fname,
//             this.lname=lname
//         }

//         get fullname(){
//             return `${this.fname} ${this.lname}`
//         }

//         set fullname (newname){
//             let [fname,lname]= newname.split()
//             this.fname=fname,
//             this.lname=lname
//         }
//     }
//     let user1= new user("Shraddha","Bhuva")
//      console.log(user1.fullname)

//      user1.fullname = 'shraddha bhuva';
// console.log(user1.fullname);

// ////////////////////////////////////////////////////////////

// class person4 {
//     constructor(name, age){
//         this.name=name,
//         this.age=age
//     }
//     static fromJSON(jsonstring){
//         const data= JSON.parse(jsonstring)
//         return new person4 (data.name ,data.age )
//     }
// }
// let personJSON =`{"name" :"SHREYA" ,"age": 45}`;

// let person7 =person4.fromJSON(personJSON)
// console.log(person7)


// /////////////////////////////////////////////////////////////////////


// function person (name,age){
//     let _name=name;
//     let  _age=age;
  
//     this.get= function(){
//       return `my name is ${_name} & my age is ${_age}`
    
//     };
     
//     this.set=function(newperson){
//       let[newname,newage]=newperson.split(',');
//       _name=newname.trim(),
//       _age=parseInt(newage.trim())
  
    
//   };
//   }
//   let person1=new person("shraddha",24)
//   console.log(person1.get())
  
//   person1.set("sunidhi, 45")
//   console.log(person1.set()) 
 ////////////////////////////////////////////////////////////////////////////////////
class shape{
    calculatearea(){
        console.log('area calculating')
        return 0;
    }
  }
  class circle extends shape{
    constructor (radious) {
        super()
        this.redious = radious 
    }
    calculatearea(){
        console.log("calculating area of circle")
        return Math.PI *this.redious*this.redious
    }
  }

  class square extends shape {
    constructor(length){
        super()
            this.length=length
        
    }
    calculatearea(){
        console.log('calculating area of square')
        return this.length*this.length
    }
  }

  let circle1 = new circle(4)
  let square1 = new square(6)
  console.log(circle1.calculatearea());
  console.log(square1.calculatearea())
  
///////////////////////////////////////////////////////////////

  class animal{
    constructor(name){
      this.name=name
    }
    makeSound(){
      console.log("make sound must be implimented")
    }
  }

  class dog extends animal{
    constructor(name){
      super(name);
    }
     makeSound(){
      return " woof... woof..."
     }
  }

  class cat extends animal{
    constructor(name){
      super(name);
    }
    makeSound(){
      return "meow.. meow.."
    }
    jump(){
      console.log("yes")
    }
  }

  let dog1= new dog("Pluto")
  console.log(dog1.makeSound())
  console.log(dog1.jump())

  let cat1= new cat("ruby")
  console.log(cat1.makeSound())
  console.log(cat1.jump())

