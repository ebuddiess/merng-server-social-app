const validator = require('validator')


function validateRegistrationInput(username , email , password , confirmpwd) {
    const errors = {}
    if(!validator.isEmail(email)){
        errors.email = "Invalid Email" 
    }

    if(!validator.equals(password,confirmpwd)){
        errors.confirmpassword = "Password must match"
    }

    if(validator.isEmpty(password)){
        errors.password = "Password is empty "
    }

    if(validator.isEmpty(username)){
        errors.username = "Username is empty"
    }

    return {
        errors ,
        valid :  Object.keys(errors).length < 1 
    }

}


function validateLoginInput(email , password) {

    const errors = {}
    if(!validator.isEmail(email)){
        errors.email = "Invalid Email" 
    }

    

    if(validator.isEmpty(password)){
        errors.password = "Password is empty "
    }

    return {
        errors ,
        valid :  Object.keys(errors).length < 1 
    }

}

module.exports = {
validateRegistrationInput ,
validateLoginInput
}