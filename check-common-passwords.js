/* simplified - only check if the new password is part of commonly used passwords
   read the file to get the password list
   get the new password
   let the user know if the new password is safe or not.
*/
const fs = require("fs"); // Importing fs to allow us to use it.
const readline = require('readline-sync');  // Import readline-sync for synchronous input

const inputFile = "./common_passwords.txt";

function getPasswords(filename) {
  const data = fs.readFileSync(inputFile, "utf-8");  
  return data.split(/\n/);
}

function getNewPassword() {
  const password = readline.question("Please enter your password: ", {
    hideEchoBack: true  // Masks the password input for privacy
  });
  return password;
}

function checkIfCommonPassword(existingPasswords){  
  const password = getNewPassword();
  if( existingPasswords.includes(password)) {
    console.log("You have chosen a commonly used password. Try again!");
    checkIfCommonPassword(existingPasswords);
  }
  else {
    console.log("The password you chose is safe");
  } 
}

// End of functions


// Call a function to read in the data from a file.
let existingPasswords = getPasswords(inputFile);

checkIfCommonPassword(existingPasswords);






