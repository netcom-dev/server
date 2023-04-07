
const validateEmail =email =>/^[a-zA-Z0-9]+[\.-]?[a-zA-Z0-9]+?@\w{2,}[\.]?[a-zA-Z0-9]{2,}?\.\w{2,}$/gi.test(email)?true:false;

const validateText = text => /^[a-zA-Z0-9]+\.{0,1}\-{0,1}\s?([a-zA-Z0-9]+)*$/gi.test(text)? true: false;

const validateNumber =number =>/^[\-\+]?[0-9]+\.?[0-9]+$/gi.test(number)? true: false;

const validate ={
    number: validateNumber,
    email: validateEmail,
    string: validateText,
};

export const checkUserInput =(userInput, rules) =>{
    let errors ={};
    let valid ={};

    [...Object.keys(userInput)].forEach(key =>{
        if(!userInput[key].toString().trim().length) errors ={...errors,[key]:`is required*`};
        else{
            if(validate[typeof rules[key]()](userInput[key])) valid ={...valid, [key]: userInput[key]}
            else errors ={...errors,[key]: "invalid input"};
        }
    });
    if ([...Object.keys(errors)].length) return {isValid: false, errors, valid};
    return {isValid: true, valid};
}