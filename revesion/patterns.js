// console.log("right angled triangle")
// debugger
// for (i=1 ; i<=5 ; i++){
//   let a= " ";
//   for(j=1 ;j<=i; j++){
//     a += "*";
//   }
//   console.log(a);
// }
///////////////////////////////////////////////////////////////
// console.log("left angled triangle") 

// for (i=1 ; i<=5 ; i++){
//   let a= "";

// for (j=1; j<=5-i; j++){
//   a+=" "
// }
//   for(j=1 ;j<=i; j++){
//     a += "*";
//   }
//   console.log(a);
// }
////////////////////////////////////////////////////////////
// console.log("mirror right angled triangle")


// for (i=5 ; i>=1 ; i--){
//   let a= " ";
//   for(j=1 ;j<=i; j++){
//     a += "*";
//   }
//   console.log(a);
// }
///////////////////////////////////////////////////////
// console.log("mirror left angled triangle")

// for (i=5 ; i>=1 ; i--){

//   let a= " ";
//   for (j=1; j<=5-i; j++){
//     a+=" "
//   }
//     for(j=1 ;j<=i; j++){
//       a += "*";
//     }
//     console.log(a);
// }
///////////////////////////////////////////////

console.log("pyramid")

for (let i=1; i<=5; i++){
  let a= ""

  for (space=1;space<= 5-i; space++){
    a+= " ";

  }
  for(j=1; j<=2*i-1; j++){
    a+= "*";
  }
  console.log(a)
}
////////////////////////////////////////////////
// console.log("square ")

// for (i=1 ; i<=5 ; i++){
//   let a= " ";

// for (j=1; j<=5; j++){
//   a+="* "
// }
//   console.log(a);
// }


//////////////////////////////////////////////

console.log("empty square")
for (i=1; i<=5;i++){
  let a=""
  for(j=1;j<=5; j++){
    if(i===1 || i===5||j===1||j===5){
      a += "* "
    }else{
      a += "  ";
    }
  }
  console.log(a)
}

////////////////////////////////////////////////////
console.log("pyramid")
for(i=1; i<=5 ; i++){
  let a= "";
  for(let space = 1; space <= 5 - i; space++){
    a += " ";
  }
  for (j=1;j<=i;j++){
    a += "* ";
  }
  console.log(a)
}

/////////////////////////////////////////////////
console.log("rectangle ")

for (i=1 ; i<=10 ; i++){
  let a= "";

for (j=1; j<=5; j++){
  a+="* "
}
  console.log(a);
}

////////////////////////////////////////////////

