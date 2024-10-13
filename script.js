const formNode = document.getElementById("eventRegistrationForm");

const emailInputNode = formNode.elements["userEmail"];
const userNameNode = formNode.elements["userName"];
const ageInputNode = formNode.elements["userAge"];
const phoneNumberNode = formNode.elements["phoneNumber"];


const inputGroupNameNode = document.querySelector(".input-group-name");
const inputGroupAgeNode = document.querySelector(".input-group-age");
const inputGroupEmailNode = document.querySelector(".input-group-email");
const inputGroupPhoneNode = document.querySelector(".input-group-phone");



let nameErrorMessage = "";
let emailErrorMessage = "";
let ageErrorMessage = "";
let phoneErrorMessage = "";

formNode.addEventListener("submit",(event) => {

    event.preventDefault();


    nameErrorMessage = "";
    emailErrorMessage = "";
    ageErrorMessage = "";
    phoneErrorMessage = "";

    const validationName = validateUserName();
    if(!validationName){ 
        showInputError(inputGroupNameNode, nameErrorMessage); 
    }

    const validationAge = validateUserAge();
    if(!validationAge){
        showInputError(inputGroupAgeNode, ageErrorMessage)
    }

    const validationEmail = validateUserEmail();
    if(!validationEmail){
        showInputError(inputGroupEmailNode, emailErrorMessage)
    }

    const validatePhone = validPhoneNumber();
    if(!validatePhone){
        showInputError(inputGroupPhoneNode, phoneErrorMessage)
    }
    emailInputNode.value ="";
    userNameNode.value ="";
    ageInputNode.value ="";
    phoneNumberNode.value ="";
});

function showInputError(inputElement, message) {
  
    const warningMessageNode = document.createElement("p");
    warningMessageNode.className = "warning-message";

    // remove old error message
    const exsitingWarningMessage = inputElement.querySelector(".warning-message");
   
    if(exsitingWarningMessage){
        inputElement.removeChild(exsitingWarningMessage);
    }

    
    warningMessageNode.innerText = message;
    warningMessageNode.setAttribute("role", "alert");
    inputElement.appendChild(warningMessageNode);
}





function validateUserName(){
    const userName = escapeHTML(document.getElementById("userName").value);
    console.log(userName);
    if (userName === ""){
        nameErrorMessage = ("Username must be entered.");
        return false;
    } else if(userName.length > 50){
        nameErrorMessage = ("Username should be less than 50 char");
        return false;  
    }
    return true;
}


//Function to validate user age
function validateUserAge(){
    const userAge = document.getElementById("userAge").value;
    console.log(userAge);
    if(userAge.length == ""){
        ageErrorMessage = "Age must be required";
        return false;
    }
    // to convert the input value into number
    const numerciUserAge = Number(userAge);

    if(numerciUserAge < 18){
        ageErrorMessage = "user must be older than 18";
        return false;

    }else if(isNaN(userAge)){
        ageErrorMessage = "Age must be a valid number";
        return false;
    }
    return true;
}

//Function to validate user Email
function validateUserEmail(){
    const email = document.getElementById("userEmail").value;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(email.length === 0){
        emailErrorMessage ="Email must be required";
        return false;
    }else if(!emailPattern.test(email)){
        emailErrorMessage = "Invalid Email";
        return false;
    }
    return true;
}

//Function to validate Phone Number
function validPhoneNumber(){
    const phoneNumber = document.getElementById("phoneNumber").value;
    const phoneNumberPattern = /^[0-9]{10}$/;
    if(phoneNumber.length === 0){
        phoneErrorMessage = "Phone number must be required.";
        return false;
    }else if(!phoneNumberPattern.test(phoneNumber)){
        phoneErrorMessage = "Please enter a valid 10-digit phone number.";
        return false;
    }
    return true;
}



function escapeHTML(input) {
    // g flag tests against all possible matches 

    // "<div>" will be read as &lt;div&gt; 
    // html interpreter will not interpret these strings as markup-- it will just display them on the page using the corresponding code
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
