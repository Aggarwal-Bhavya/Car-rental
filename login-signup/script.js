const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
});

// js code to appear signup and login form
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});

// REGISTRATION FORM VALIDATIONS
// USERNAME
const username = document.getElementById('username');
const confirmUsername = document.getElementById('errorUsername');

const isValidUsername = (username) => {
    const regex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    // console.log(username.match(regex));
    return username.match(regex);
};

username.addEventListener('input', (e) => {
    if (username.value == '') {
        username.parentElement.classList.remove('error');
        confirmUsername.innerHTML = 'Username is required';
    } else if(!isValidUsername(username.value)) {
        username.parentElement.classList.remove('error');
        confirmUsername.innerHTML = 'Provide a valid alphanumeric username of length 8-30';
    } else {
        username.parentElement.classList.add('error');
    }
});

// EMAIL
const email = document.getElementById('email');
const confirmEmail = document.getElementById('errorEmail');

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return email.match(regex);
};

email.addEventListener('input', (e) => {
    if (email.value == '') {
        email.parentElement.classList.remove('error');
        confirmEmail.innerHTML = 'Email is required';
    } else if (!isValidEmail(email.value)) {
        email.parentElement.classList.remove('error');
        confirmEmail.innerHTML = 'Please enter your email address in format: yourname@example.com';
    } else {
        email.parentElement.classList.add('error');
    }
});

// PASSWORD
const password = document.getElementById('password');
const confirmPassword = document.getElementById('errorPassword');

const isValidPassword = (password) => {
    // var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
    // var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?/~_+-=|]).{8,32}$/;
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
    return password.match(regex);
}

password.addEventListener('input', (e) => {
    if (password.value == '') {
        password.parentElement.classList.remove('error');
        confirmPassword.innerHTML = 'Password is required';
    } else if (!isValidPassword(password.value)) {
        password.parentElement.classList.remove('error');
        confirmPassword.innerHTML = 'Password must be 8+ including 1 lowercase, 1 uppercase, 1 special character and 1 number';
    } else {
        password.parentElement.classList.add('error');
    }
});

// CONFIRM PASSWORD
const cPassword = document.getElementById('confirm-password');
const confirmcPassword = document.getElementById('errorConfirmPassword');

cPassword.addEventListener('input', (e) => {
    if (cPassword.value == '') {
        cPassword.parentElement.classList.remove('error');
        confirmcPassword.innerHTML = 'Please confirm your password';
    } else if (cPassword.value != password.value) {
        cPassword.parentElement.classList.remove('error');
        confirmcPassword.innerHTML = 'Passwords do not match';
    } else {
        cPassword.parentElement.classList.add('error');
    }
});

// REGISTRATION FORM SUBMISSION: STORE DATA IN INDEXEDDB
//Indexed DB code
const form = document.querySelector('.signupForm');

const signupAction = function () {
    var idb = indexedDB.open('Accounts', 1);

    idb.onerror = function (e) {
        console.log('Error faced!');
    };

    idb.onupgradeneeded = function () {
        var request = idb.result;
        request.createObjectStore('User', { autoIncrement: true });
    };

    idb.onsuccess = function (e) {
        // e.preventDefault();
        var request = idb.result;
        var tx = request.transaction('User', 'readwrite');
        var store = tx.objectStore('User');

        if (checkEmpty()) {
            alert('User registered successfully! Login NOW!');
            store.put({
                name: form[0].value,
                email: form[1].value,
                password: form[2].value,
                // confirmPassword: form[3].value
            });
            location.reload();

        } else {
            alert('Fill up all fields!')
            e.preventDefault();
        }
    }
};

function checkEmpty() {
    return (
        form[0].value != '' && 
        form[1].value != '' && 
        form[2].value != '' && 
        form[3].value != ''
    );
}

// LOGIN VIA INDEXED DB
const loginForm = document.querySelector('.loginForm');
const loginAction = function() {
    var idb = indexedDB.open('Accounts', 1);

    idb.onsuccess = function(e) {
        var request = idb.result;
        var tx = request.transaction('User', 'readonly');
        var store = tx.objectStore('User');
        var cursor = store.openCursor();
        cursor.onsuccess = function() {
            let currRes = cursor.result;
            if((currRes.value.name == loginForm[0].value || currRes.value.email == loginForm[0].value) && currRes.value.password == loginForm[1].value) {
                console.log(currRes.value);
                window.location.href = "../User/home.html";
                // currRes.continue();
            } else {
                currRes.continue();
                // console.log('Enter valid details')
            }
        }
    }
}