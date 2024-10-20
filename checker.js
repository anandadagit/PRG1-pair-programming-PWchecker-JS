const commonPassword = require('./check-common-passwords');
const fs = require("fs"); // Importing fs to allow us to use it.
const readline = require('readline-sync');  // Import readline-sync for synchronous input

const outputFile = "./checking_password_log.txt";
const inputFile = "./common_passwords.txt";


// No need for a comment as the function name is self-describing.
function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
  const year = String(currentDate.getFullYear());
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

const passwordCriteria = {
    length: /.{8,}/,                    // Minimum 8 characters
    uppercase: /[A-Z]/,                // Must have uppercase letters
    lowercase: /[a-z]/,                // Must have lowercase letters
    digit: /[0-9]/,                    // Must have digits
    specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\|=]/  // Must have special characters
};

function isStrongPassword(password) {
    // Check each condition using the predefined regex
    return passwordCriteria.length.test(password) &&
           passwordCriteria.uppercase.test(password) &&
           passwordCriteria.lowercase.test(password) &&
           passwordCriteria.digit.test(password) &&
           passwordCriteria.specialChar.test(password);
}

function getPasswordStrength(password) {
    const conditionsPassed = [
        passwordCriteria.length.test(password),
        passwordCriteria.uppercase.test(password),
        passwordCriteria.lowercase.test(password),
        passwordCriteria.digit.test(password),
        passwordCriteria.specialChar.test(password)
    ].filter(x => x === true).length;
  
    if (conditionsPassed === 5) {
      return "Strong";
    } else if (conditionsPassed >= 3) {
      return "Medium";
    } else {
      return "Weak";
    }
  }


function checkPassword() {
    const password = readline.question("Please enter your password: ", {
        hideEchoBack: true  // Masks the password input for privacy
    });
    const currentDateTime = getCurrentDateTimeFormatted();    

    const strength = getPasswordStrength(password);
    console.log(`Password strength: ${strength}`);

    let existingPasswords = commonPassword.getPasswords(inputFile);
    let common = commonPassword.isCommonPassword(existingPasswords, password);

    if (strength === "Strong" && !common) {
        console.log("Your password is strong");
        const scrambledPassword = password.slice(password.length - 2) + password.slice(2,password.length - 2) + password.slice(0, 2)
        fs.appendFileSync(outputFile, `${currentDateTime} ${scrambledPassword}\n`, "utf-8");
    } else {
        console.log("Password does not meet the criteria. Please enter a different password.");
        checkPassword();  
    }
}

// End of functions
checkPassword();

/*let existingPasswords = commonPassword.getPasswords(inputFile);
const password = 'anand';
let common = commonPassword.isCommonPassword(existingPasswords, password);
common ? console.log("Common") : console.log("not common");*/







