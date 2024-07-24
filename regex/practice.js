const today= new Date();
const curruntYear=today.getFullYear();
const currentMonth=today.getMonth();
const currentDay=today.getDate();

function daysinmonth(month ,year){
    const month30=[4, 6, 9, 11] ;
    if(month30.includes(month)){
        return '(0[1-9]|[12][0-9]|30)';
    }
    else if(month===2){
        if((year% 4===0 &&year% 100===0)||(year % 400===0)){
            return`([0-9]|1[0-9]|2[0-9])`;
        }else{
            return`([0-9]|1[0-9]|2[0-9])`;
        }
    }
    else{
        return'(0[1-9]|[12][0-9]|30)';
    }
    
}
let currentyearpattern ='';
for (let month=1; month<=currentMonth;month++){
    const daysPattern= (month=== currentMonth)? `(0[1-${currentDay}])` :daysInMonthRegex(month,curruntYear);
    currentyearpattern += 
}