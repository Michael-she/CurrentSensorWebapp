document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("repeatPassword").addEventListener("input", validatePassword);
document.getElementById("phoneNumber").addEventListener("focusout", validatePhoneNumber);

document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("username").addEventListener("input", validateUsername);



function validateAllInputs() {
    // Call each validation function
    var isPasswordValid = validatePassword();
    var isEmailValid = validateEmail();
    var isPhoneNumberValid = validatePhoneNumber();
    var isUsernameValid = validateUsername();
    
    // Check if all validations are true
    if (isPasswordValid && isEmailValid && isPhoneNumberValid && isUsernameValid) {
        // All inputs are valid
        return true;
    } else {
        // At least one input is invalid
        return false;
    }
}


function validatePassword() {
   // console.log("Checking Password");
    // Get the values of the password fields
    
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;
    
    // Check if passwords match
    if (password !== repeatPassword) {
        // If passwords do not match, display an error message
        document.getElementById("Passerror").innerHTML = `<t>Passwords do not match</t>`;
        return false;
        
    } else if (hasWhitespace(password)) { //Checks via a function if the password begins or ends with whitespace
        
        document.getElementById("Passerror").innerHTML = '<t>You cannot begin or end your password with whitespace<t>';
        return false;
    } else {
        // If passwords match, clear the error message
        document.getElementById("Passerror").innerHTML = "";
        return true;
    }
}


function validatePassword() {
    //console.log("Checking Password");
    // Get the values of the password fields
    
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;
    
    // Check if passwords match

    if(password ==""){
        document.getElementById("Passerror").innerHTML = '<t>You need a password<t>';
        return false

    }
    if (password !== repeatPassword) {
        // If passwords do not match, display an error message
        document.getElementById("Passerror").innerHTML = `<t>Passwords do not match</t>`;
        return false;
        
    } else if (hasWhitespace(password)) { //Checks via a function if the password begins or ends with whitespace
        
        document.getElementById("Passerror").innerHTML = '<t>You cannot begin or end your password with whitespace<t>';
        return false;
    } else {
        // If passwords match, clear the error message
        document.getElementById("Passerror").innerHTML = "";
        return true;
    }
}





//Make Sure that the emails are valid

function validateEmail() {
    
    const emailStr = document.getElementById("email").value; //Gte the value of the email field
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //Define a regex of valid characters
    
    if (emailStr.match(validRegex)) {//check if the email address contains only valid characters
        
        //console.log("Valid email address!");
        
        document.getElementById("emailError").innerHTML = ""; //Clear any previous errors
        
        return true;
        
    } else {
        
       // console.log("Invalid email address!");
        
        document.getElementById("emailError").innerHTML = `<t>The Email is invalid</t>`; //The email conatined an invalid character, and thus this error must be displayed
        
        return false;
    }
    
    
    
}

//Validate the phone Number
function validatePhoneNumber() {
   // console.log("Testing Phone Number");
    var phoneNumber = document.getElementById("phoneNumber").value; 	// get the value of the "phonenumber" field
    if (phoneNumber === "") { //If the phone number is empty, no error need be displayed
        return false;
    }
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; //define a regex of valid character and valid character positions
    if (phoneRegex.test(phoneNumber)) { //The inputted value matches the structure defined by the regex
        document.getElementById("errorPhone").innerHTML = "";
        //console.log("Passed");
        return true;
    } else {
        document.getElementById("errorPhone").innerHTML = `<t>Phone Number not valid</t>`;
       // console.log("It failed...");
        return false;
    }
}


function validateUsername() {
    // Get the input and error elements
    const usernameInput = document.getElementById('username');
    const userNameError = document.getElementById('userNameError');
    
    // Define the regular expression for valid usernames (only alphabetical characters and a space)
    const usernameRegex = /^[a-zA-Z ]*$/;
    
    if (usernameRegex.test(usernameInput.value)) {
        
        
        
        if (hasWhitespace(usernameInput.value)) { //Checks via a function if the username begins or ends with whitespace
            
            userNameError.innerHTML = '<t>You cannot begin or end your username with whitespace<t>';
            return false;
        }
        
        // If the input is valid, clear the error message and return true
        userNameError.innerHTML = '';
        
        
        
        
        return true;
    }
    
    // Check if the input value matches the regex
    else {
        // If the input is invalid, display an appropriate error message and return false (The username is not valid)
        if (usernameInput.value === '') {
            userNameError.innerHTML = '<t>Username is required.<t>';
        } else {
            userNameError.innerHTML = '<t>Username can only contain letters (no numbers or special characters).<t>';
        }
        //console.log(userNameError.innerHTML);
        return false;
    }
}



function hasWhitespace(string) { //This function will check inputted strings for leading or trailing whitespace
   // console.log("Whitespace Check");
    //console.log(/^\s|\s$/.test(string));
    return /^\s|\s$/.test(string);
    
}