// Array of special characters to be included in password
var specialCharacters = [
    '@',
    '%',
    '+',
    '\\',
    '/',
    "'",
    '!',
    '#',
    '$',
    '^',
    '?',
    ':',
    ',',
    ')',
    '(',
    '}',
    '{',
    ']',
    '[',
    '~',
    '-',
    '_',
    '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
    // prompt user for password length
    let passwordLength = parseInt(prompt('Password length must be between 8-120'));
    // validate password length: if passwordLength.is NaN, or not between 8-120, then alert error, and restart 
    if (passwordLength < 9 || passwordLength > 128 || isNaN(passwordLength)) {
        alert("Password length must be between 8-128. Please enter a valid password.");
        return null;
    }

    // prompt user to include lower case characters 
    let includeLowerCase = confirm('Do you want to include lowercase characters?');

    // prompt user to include upper case characters 
    let includeUpperCase = confirm('Do you want to include uppercase characters?');

    // prompt user to include numberical characters 
    let includeNumbers = confirm('Do you want to include numerical characters?');

    // prompt user to include special characters 
    let includeSpecial = confirm('Do you want to include special characters?');

    // validate that at least one character type is selected 
    if (!(includeLowerCase || includeUpperCase || includeSpecial || includeNumbers)) {
        alert("At least one character type must be selected.");
        return null;
    }

    // create a new object with all the options
    return {
        passwordLength: passwordLength,
        includeLowerCase: includeLowerCase,
        includeUpperCase: includeUpperCase,
        includeNumbers: includeNumbers,
        includeSpecial: includeSpecial,
    };
}

// Function for getting a random element from an array
function getRandom(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomCharacter = arr[randomIndex];
    return randomCharacter;
}

// Function to generate password with user input
function generatePassword() {
    // call the function getPasswordOptions 
    let passwordOptions = getPasswordOptions()
    if (!passwordOptions) {
        // If options are not provided, return an empty string
        return "";
    }

    let password = [];
    let possibleCharacters = [];
    let guaranteedCharacters = [];

    // Concatenate character arrays based on user options
    if (passwordOptions.includeLowerCase) {
        possibleCharacters = possibleCharacters.concat(lowerCasedCharacters)
        guaranteedCharacters.push(getRandom(lowerCasedCharacters));
    }
    if (passwordOptions.includeUpperCase) {
        possibleCharacters = possibleCharacters.concat(upperCasedCharacters)
        guaranteedCharacters.push(getRandom(upperCasedCharacters));
    }
    if (passwordOptions.includeNumbers) {
        possibleCharacters = possibleCharacters.concat(numericCharacters)
        guaranteedCharacters.push(getRandom(numericCharacters));
    }
    if (passwordOptions.includeSpecial) {
        possibleCharacters = possibleCharacters.concat(specialCharacters)
        guaranteedCharacters.push(getRandom(specialCharacters));
    }

    // Generate the remaining characters randomly
    for (let i = 0; i < passwordOptions.passwordLength - guaranteedCharacters.length; i++) {
        let randomCharacter = getRandom(possibleCharacters);
        password.push(randomCharacter);
    }

    // Combine guaranteed and random characters, then shuffle the array
    password = password.concat(guaranteedCharacters);
    password = password.sort(() => Math.random() - 0.5);

    // Convert the array to a string and return the password
    return password.join('');
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector('#password');

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
