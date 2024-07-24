const birthdateREgex = /^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;

let person={
    birthdate:'2024-02-30'
}
const errors=[ ];
const success =[ ];

let validatebirthdate=()=>{
    if(birthdateREgex.test(person.birthdate)){
            // return "right birthdate"
            success.push(` birth date :${person.birthdate}`) 
    }else{
        errors.push(`add valid birthdate. ${person.birthdate} is incorrect .`)
    }
}
validatebirthdate()





console.log( "errors: ", errors)
console.log('success: ', success)