/*
Name: Serena Scaria
Date created: December 10, 2025
Date last edited: December 10, 2025
Version: 2.0 - Extra Credit
Description: Extra Credit Patient Registration Form JavaScript
*/

//email validation regex
var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//List of inputs - separate first name (cookie) from others (localStorage)
var inputs = [
    {id:"minitial", storageName:"middleInitial"},
    {id:"lname", storageName:"lastName"},
    {id:"dob", storageName:"dob"},
    {id:"ssn", storageName:"ssn"},
    {id:"address1", storageName:"address1"},
    {id:"city", storageName:"city"},
    {id:"zip", storageName:"zipCode"},
    {id:"email", storageName:"email"},
    {id:"phone", storageName:"phone"},
    {id:"uid", storageName:"userId"}
];

//date of birth validation
function validateDob() {
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (dob.value === "") {
        document.getElementById("dob-error").innerHTML = "Date of birth is required";
        return false;
    } else if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}

//ssn validation
function validateSsn() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if(!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}

//zip code validation
function validateZip() {
    const zipInput = document.getElementById("zip");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("zip-error").innerHTML = "Zip code can't be blank";
        return false;
    }

    if (zip.length > 5) {
        zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    } else {
        zip = zip.slice(0, 5);
    }

    zipInput.value = zip;
    
    const zipPattern = /^\d{5}(-\d{4})?$/;
    if (!zipPattern.test(zip)) {
        document.getElementById("zip-error").innerHTML = "Please enter a valid zip code";
        return false;
    }
    
    document.getElementById("zip-error").innerHTML = "";
    return true;
}

//email validation
function validateEmail() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    const error = document.getElementById("email-error");

    if (!email) {
        error.innerHTML = "Email can't be blank";
        return false;
    }

    if (!emailR.test(email)) {
        error.innerHTML = "Please enter a valid email address (e.g., name@domain.tld)";
        return false;
    }

    error.innerHTML = "";
    return true;
}

//phone number validation
function validatePhone() {
    const phoneInput = document.getElementById("phone");
    let phone = phoneInput.value.replace(/[^\d]/g, "");

    if (!phone) {
        document.getElementById("phone-error").innerHTML = "Phone number can't be blank";
        return false;
    }

    if (phone.length > 3 && phone.length <= 6) {
        phone = phone.slice(0, 3) + "-" + phone.slice(3);
    } else if (phone.length > 6) {
        phone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6, 10);
    }

    phoneInput.value = phone.slice(0, 12);

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phone-error").innerHTML = "Please enter a valid phone number (e.g., 123-456-7890)";
        return false;
    }

    document.getElementById("phone-error").innerHTML = "";
    return true;
}

//User ID validation
function validateUid() {
    uid = document.getElementById("uid").value.toLowerCase();
    document.getElementById("uid").value = uid;

    if (uid.length == 0) {
        document.getElementById("uid-error").innerHTML = "User ID can't be blank";
        return false;
    }

    if (!isNaN(uid.charAt(0))) {
        document.getElementById("uid-error").innerHTML = "User ID can't start with a number";
        return false;
    }

    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        document.getElementById("uid-error").innerHTML = "User ID can only have letters, numbers, underscores, and dashes";
        return false;
    } else if (uid.length < 5) {
        document.getElementById("uid-error").innerHTML = "User ID must be at least 5 characters";
        return false;
    } else if (uid.length > 30) {
        document.getElementById("uid-error").innerHTML = "User ID can't exceed 30 characters";
        return false;
    } else {
        document.getElementById("uid-error").innerHTML = "";
        return true;
    }
}

//password validation
function validatePword() {
    const pword = document.getElementById("pword").value;
    const uid = document.getElementById("uid").value;
    const error = document.getElementById("pword-error");
    let messages = [];

    if (pword.length === 0) {
        error.innerHTML = "Password can't be blank";
        return false;
    }

    if (!pword.match(/[a-z]/)) messages.push("Enter at least one lowercase letter");
    if (!pword.match(/[A-Z]/)) messages.push("Enter at least one uppercase letter");
    if (!pword.match(/[0-9]/)) messages.push("Enter at least one number");
    if (!pword.match(/[!@#$%&*_\-\.+()]/)) messages.push("Enter at least one special character");
    if (uid && pword.includes(uid)) messages.push("Password can't contain user ID");

    error.innerHTML = messages.join("<br>");
    return messages.length === 0;
}

//confirm password validation
function confirmPword() {
    const pword1 = document.getElementById("pword").value;
    const pword2 = document.getElementById("pword2").value;

    if (pword2.length === 0) {
        document.getElementById("pword2-error").innerHTML = "Please confirm your password";
        return false;
    }

    if (pword1 !== pword2) {
        document.getElementById("pword2-error").innerHTML = "Passwords don't match";
        return false;
    } else {
        document.getElementById("pword2-error").innerHTML = "Passwords match";
        document.getElementById("pword2-error").style.color = "green";
        return true;
    }
}

//City validation
function validateCity() {
    city = document.getElementById("city").value.trim();

    if (!city) {
        document.getElementById("city-error").innerHTML = "City can't be blank";
        return false;
    } else {
        document.getElementById("city-error").innerHTML = "";
        return true;
    }
}

//First name validation
function validateFname() {
    fname = document.getElementById("fname").value.trim();
    var namePattern = /^[a-zA-Z'-]+$/;
    
    if (fname == "") {
        document.getElementById("fname-error").innerHTML = "First name field cannot be empty";
        return false;
    } else if (!fname.match(namePattern)) {
        document.getElementById("fname-error").innerHTML = "Letters, apostrophes, and dashes only.";
        return false;
    } else if (fname.length < 1) {
        document.getElementById("fname-error").innerHTML = "First name cannot be less than 1 character.";
        return false;
    } else if (fname.length > 30) {
        document.getElementById("fname-error").innerHTML = "First name cannot be more than 30 characters.";
        return false;
    } else {
        document.getElementById("fname-error").innerHTML = "";
        return true;
    }
}

//Middle name validation
function validateMinitial() {
    minitial = document.getElementById("minitial").value.trim();
    var namePattern = /^[A-Z]$/;
 
    minitial = minitial.toUpperCase();
    document.getElementById("minitial").value = minitial;
 
    if (minitial == "") {
        document.getElementById("minitial-error").innerHTML = "";
        return true;
    }

    if (!minitial.match(namePattern)) {
        document.getElementById("minitial-error").innerHTML = "Middle initial must be a single uppercase letter";
        return false;
    } else {
        document.getElementById("minitial-error").innerHTML = "";
        return true;
    }
}
     
//Last name validation
function validateLname() {
    lname = document.getElementById("lname").value.trim();
    var namePattern = /^[a-zA-Z'-]+$/;
    
    if (lname == "") {
        document.getElementById("lname-error").innerHTML = "Last name field cannot be empty";
        return false;
    } else if (!lname.match(namePattern)) {
        document.getElementById("lname-error").innerHTML = "Letters, apostrophes, and dashes only.";
        return false;
    } else if (lname.length < 2) {
        document.getElementById("lname-error").innerHTML = "Last name cannot be less than 2 characters.";
        return false;
    } else if (lname.length > 30) {
        document.getElementById("lname-error").innerHTML = "Last name cannot be more than 30 characters.";
        return false;
    } else {
        document.getElementById("lname-error").innerHTML = "";
        return true;
    }
}    

//Address validation
function validateAddress1() {
    const address = document.getElementById("address1").value.trim();
    
    if (!address) {
        document.getElementById("address1-error").innerHTML = "Address can't be blank";
        return false;
    } else {
        document.getElementById("address1-error").innerHTML = "";
        return true;
    }
}

function validateAddress2() {
    // Address 2 is optional, so always return true
    return true;
}

//State validation
function validateState() {
    const state = document.getElementById("state").value;
    
    if (!state) {
        return false;
    }
    return true;
}

//Gender validation
function validateGender() {
    const genders = document.getElementsByName("gender");
    let checked = false;
    
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            checked = true;
            break;
        }
    }
    
    return checked;
}

//COVID validation
function validateCovid() {
    const covidOptions = document.getElementsByName("covid");
    let checked = false;
    
    for (let i = 0; i < covidOptions.length; i++) {
        if (covidOptions[i].checked) {
            checked = true;
            break;
        }
    }
    
    return checked;
}

//Validation of all fields
function validateEverything() {
    let valid = true;

    if (!validateFname()) valid = false;
    if (!validateMinitial()) valid = false;
    if (!validateLname()) valid = false;
    if (!validateGender()) valid = false;
    if (!validateDob()) valid = false;
    if (!validateSsn()) valid = false;
    if (!validateAddress1()) valid = false;
    if (!validateCity()) valid = false;
    if (!validateState()) valid = false;
    if (!validateZip()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validatePhone()) valid = false;
    if (!validateCovid()) valid = false;
    if (!validateUid()) valid = false;
    if (!validatePword()) valid = false;
    if (!confirmPword()) valid = false;
    
    return valid;
}

//ENHANCEMENT 1: Modal Box for Review Before Submit
function showModalReview() {
    // First validate everything
    let valid = validateEverything();
    
    if (!valid) {
        showAlert();
        return false;
    }
    
    // Build the modal content with all form data
    var modalBody = "<table class='modal-review-table'>";
    modalBody += "<tr><th colspan='2' style='text-align:center; font-size:1.2em; padding:10px;'>Check your entries...</th></tr>";
    
    // Name section
    var fname = document.getElementById("fname").value;
    var minitial = document.getElementById("minitial").value;
    var lname = document.getElementById("lname").value;
    var fullName = fname + (minitial ? " " + minitial + ". " : " ") + lname;
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Name:</td><td style='padding:5px;'>${fullName}</td></tr>`;
    
    // Gender
    var genderInputs = document.getElementsByName("gender");
    var gender = "";
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            gender = genderInputs[i].value;
            break;
        }
    }
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Gender:</td><td style='padding:5px;'>${gender}</td></tr>`;
    
    // DOB
    var dob = document.getElementById("dob").value;
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Date of Birth:</td><td style='padding:5px;'>${dob}</td></tr>`;
    
    // Address section
    var address1 = document.getElementById("address1").value;
    var address2 = document.getElementById("address2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var fullAddress = address1 + (address2 ? ", " + address2 : "") + "<br>" + city + ", " + state + " " + zip;
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Address:</td><td style='padding:5px;'>${fullAddress}</td></tr>`;
    
    // Phone and Email
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Phone:</td><td style='padding:5px;'>${phone}</td></tr>`;
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Email:</td><td style='padding:5px;'>${email}</td></tr>`;
    
    // User ID
    var uid = document.getElementById("uid").value;
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>User ID:</td><td style='padding:5px;'>${uid}</td></tr>`;
    
    // Password (obscured)
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Password:</td><td style='padding:5px;'>&lt;good&gt;</td></tr>`;
    
    // SSN (obscured)
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Social Security:</td><td style='padding:5px;'>***-**-****</td></tr>`;
    
    // Household size
    var household = document.getElementById("household").value;
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>Household Size:</td><td style='padding:5px;'>${household}</td></tr>`;
    
    // COVID exposure
    var covidInputs = document.getElementsByName("covid");
    var covid = "";
    for (let i = 0; i < covidInputs.length; i++) {
        if (covidInputs[i].checked) {
            covid = covidInputs[i].value;
            break;
        }
    }
    modalBody += `<tr><td style='text-align:right; padding:5px; font-weight:bold;'>COVID Exposure (past 7 days):</td><td style='padding:5px;'>${covid}</td></tr>`;
    
    modalBody += "</table>";
    
    // Set modal content
    document.getElementById("modal-review-body").innerHTML = modalBody;
    
    // Show modal
    document.getElementById("review-modal").style.display = "block";
    
    return false; // Prevent default form submission
}

// Close modal and go back to form
function closeModalReview() {
    document.getElementById("review-modal").style.display = "none";
}

// Submit from modal
function submitFromModal() {
    // This will actually submit the form
    document.getElementById("signup").submit();
}

//ENHANCEMENT 2: ZIP Code to City/State API
async function lookupZipCode() {
    const zipInput = document.getElementById("zip");
    const zip = zipInput.value.replace(/[^\d]/g, "").slice(0, 5);
    
    if (zip.length !== 5) {
        return;
    }
    
    try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        
        if (!response.ok) {
            throw new Error("ZIP code not found");
        }
        
        const data = await response.json();
        
        // Fill in city and state
        const cityInput = document.getElementById("city");
        const stateSelect = document.getElementById("state");
        
        cityInput.value = data.places[0]["place name"];
        cityInput.readOnly = true;
        cityInput.style.backgroundColor = "#f0f0f0";
        
        // Set state - find full state name
        const stateName = data.places[0]["state"];
        for (let i = 0; i < stateSelect.options.length; i++) {
            if (stateSelect.options[i].value === stateName || 
                stateSelect.options[i].text === stateName) {
                stateSelect.selectedIndex = i;
                break;
            }
        }
        stateSelect.disabled = true;
        stateSelect.style.backgroundColor = "#f0f0f0";
        
        document.getElementById("zip-error").innerHTML = "✓ ZIP code verified";
        document.getElementById("zip-error").style.color = "green";
        
    } catch (error) {
        document.getElementById("zip-error").innerHTML = "Invalid ZIP code - please verify";
        document.getElementById("zip-error").style.color = "red";
        
        // Re-enable city and state for manual entry
        const cityInput = document.getElementById("city");
        const stateSelect = document.getElementById("state");
        
        cityInput.readOnly = false;
        cityInput.style.backgroundColor = "white";
        stateSelect.disabled = false;
        stateSelect.style.backgroundColor = "white";
    }
}

//alert box functionality
function showAlert() {
    var alertBox = document.getElementById("alert-box");
    var closeAlert = document.getElementById("close-alert");

    alertBox.style.display = "block";
    closeAlert.onclick = function() {
        alertBox.style.display = "none";
    };
}

//Cookie for first name only (tracking user)
function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

//Local Storage for all other non-secure form data
function setStorage(name, value) {
    localStorage.setItem(name, value);
}

function getStorage(name) {
    return localStorage.getItem(name) || "";
}

function deleteAllStorage() {
    localStorage.clear();
}

//DOM Event Listener - ALL initialization code here
document.addEventListener("DOMContentLoaded", function() {
    // Date code
    const d = new Date();
    let text = d.toLocaleDateString();
    document.getElementById("today").innerHTML = text;
    
    // Household slider code
    let slider = document.getElementById("household");
    let output = document.getElementById("range-slider");
    output.innerHTML = slider.value;
    slider.oninput = function () {
        output.innerHTML = this.value;
    };
    
    // Fetch states list
    const stateSelect = document.getElementById("state");
    fetch('states.json')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(states => {
            states.forEach(state => {
                const option = document.createElement("option");
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading states:", error);
        });
    
    // Handle First Name separately (uses cookie)
    var fnameElement = document.getElementById("fname");
    var firstNameCookie = getCookie("firstName");
    if (firstNameCookie !== "") {
        fnameElement.value = firstNameCookie;
    }
    fnameElement.addEventListener("input", function() {
        setCookie("firstName", fnameElement.value, 2); // 48 hours
    });

    // Handle all other fields with localStorage
    inputs.forEach(function (input) {
        var inputElement = document.getElementById(input.id);

        // Prefill input fields from localStorage
        var storageValue = getStorage(input.storageName);
        if (storageValue !== "") {
            inputElement.value = storageValue;
        }

        // Save to localStorage when the input field changes
        inputElement.addEventListener("input", function() {
            setStorage(input.storageName, inputElement.value);
        });
    });

    // Greet user with name (from cookie)
    var firstName = getCookie("firstName");
    if (firstName !== "") {
        document.getElementById("welcome1").innerHTML = "Welcome back, " + firstName + "!<br>";
        document.getElementById("welcome2").innerHTML = "<a href='#' id='new-user'>Not " + firstName + "? Click here to start a new form.</a>";
        document.getElementById("new-user").addEventListener("click", function(e) {
            e.preventDefault();
            // Clear both cookie and localStorage
            deleteCookie("firstName");
            deleteAllStorage();
            location.reload();
        });
    } else {
        document.getElementById("welcome1").innerHTML = "Welcome, New User!<br>";
    }

    // Remember me checkbox
    document.getElementById("remember-me").addEventListener("change", function() {
        const rememberMe = this.checked;

        if(!rememberMe) {
            // If unchecked, delete cookie and localStorage
            deleteCookie("firstName");
            deleteAllStorage();
            console.log("All data deleted because 'Remember Me' is unchecked.");
        } else {
            // If checked, save everything
            if (fnameElement.value.trim() !== "") {
                setCookie("firstName", fnameElement.value, 2);
            }
            inputs.forEach(function(input) {
                const inputElement = document.getElementById(input.id);
                if (inputElement.value.trim() !== "") {
                    setStorage(input.storageName, inputElement.value);
                }
            });
            console.log("Data saved because 'Remember Me' is checked.");
        }
    });
    
    // Handle remember me - clear if unchecked on page load
    const rememberMe = document.getElementById("remember-me").checked;
    if (!rememberMe) {
        deleteCookie("firstName");
        deleteAllStorage();
    }

    // EXTRA CREDIT ENHANCEMENTS BELOW
    
    // Add ZIP code lookup on blur
    const zipInput = document.getElementById("zip");
    zipInput.addEventListener("blur", function() {
        if (validateZip()) {
            lookupZipCode();
        }
    });
    
    // Modify form submission to show modal instead
    const form = document.getElementById("signup");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        showModalReview();
    });
    
    // Hide old review and validate buttons
    const oldReviewBtn = document.getElementById("review");
    const oldValidateBtn = document.getElementById("validate");
    if (oldReviewBtn) oldReviewBtn.style.display = "none";
    if (oldValidateBtn) oldValidateBtn.style.display = "none";
    
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById("review-modal");
        if (event.target == modal) {
            closeModalReview();
        }
    };
});
