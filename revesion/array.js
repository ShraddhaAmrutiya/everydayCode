let colours= ["red", "green", "blue"]
console.log(colours.length)
console.log(colours[0])
console.log(colours[1])
console.log(colours[2])
console.log(colours.push("yellow"))
console.log(colours)
console.log(colours.shift())
console.log(colours)
for (i=0; i<=colours.length; i++){
    console.log(colours[i])
}

colours.forEach (function (colours){
    console.log(colours)  
})
 colours.forEach(colours=>{
    console.log(colours)  /// arrow function 
})

let morecolors =[ "purple", "orange"]
let col =colours.concat(morecolors)
console.log(col)


console.log(colours.includes("green"))

console.log(colours.sort())
console.log(colours.reverse())

let subset = colours.slice(1,2)
console.log(subset)

console.log(colours.splice(1))

let index = colours.indexOf("green");

if (index !== -1) {
    colours.splice(index, 1);
}
console.log(colours);  

let colorLengths =colours.length
console.log(colorLengths)

console.log (colours.map(colours=>colours.length))

let longColors=colours.filter(colours=>colours.length>4)
console.log(longColors)



let totalCharacters = colours.reduce((accumulator, color) => accumulator + color.length,0);

console.log(totalCharacters);  

let z=colours.every(colours=>colours.includes('e'))
console.log(z)

let c=colours.some(colours=>colours.includes('b'))
console.log(c)

console.log(colours.indexOf("green"))

console.log(colours.join("-"))