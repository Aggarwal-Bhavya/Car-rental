var container = document.querySelector(".container"),
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
var username = document.getElementById('username');
var confirmUsername = document.getElementById('errorUsername');

var isValidUsername = (username) => {
    var regex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    // console.log(username.match(regex));
    return username.match(regex);
};

username.addEventListener('input', (e) => {
    if (username.value == '') {
        username.parentElement.classList.remove('error');
        confirmUsername.innerHTML = 'Username is required';
    } else if (!isValidUsername(username.value)) {
        username.parentElement.classList.remove('error');
        confirmUsername.innerHTML = 'Provide a valid alphanumeric username of length 8-30';
    } else {
        username.parentElement.classList.add('error');
    }
});

// EMAIL
var email = document.getElementById('email');
var confirmEmail = document.getElementById('errorEmail');

var isValidEmail = (email) => {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
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
var password = document.getElementById('password');
var confirmPassword = document.getElementById('errorPassword');

var isValidPassword = (password) => {
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
var cPassword = document.getElementById('confirm-password');
var confirmcPassword = document.getElementById('errorConfirmPassword');

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
var form = document.querySelector('.signupForm');

var signupAction = function () {
    var idb = indexedDB.open('Accounts', 2);

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
        var foundUsername = false;
        var foundEmail = false;
        var tx = request.transaction('User', 'readwrite');
        var store = tx.objectStore('User');
        var cursor = store.openCursor();

        cursor.onsuccess = function() {
            var currRes = cursor.result;
            if(currRes) {
                if(currRes.value.name == form[0].value) {
                    foundUsername = true;
                }
                if(currRes.value.email == form[1].value) {
                    foundEmail = true;
                }
                currRes.continue();
            } else {
                if(foundEmail) {
                    alert('Email already exists!');
                } else if(foundUsername) {
                    alert('Username already exists!');
                } else {
                    if (checkEmpty()) {
                            // console.log('User hello')
                            store.put({
                                name: form[0].value,
                                email: form[1].value,
                                password: form[2].value,
                                bookingHistory: [],
                                // confirmPassword: form[3].value
                            });
                            alert('User registered successfully! Login NOW!');
                            location.reload();
                    } else {
                        alert('Fill up all fields!')
                        e.preventDefault();
                    }
                }
            }
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
var loginForm = document.querySelector('.loginForm');

var loginAction = function () {
    var idb = indexedDB.open('Accounts', 2);

    idb.onsuccess = function (e) {
        var request = idb.result;
        var tx1 = request.transaction('User', 'readonly');
        var store1 = tx1.objectStore('User');
        var cursor1 = store1.openCursor();


        cursor1.onsuccess = function () {
            let currRes = cursor1.result;
            // console.log(currRes.value.name);
            if ((currRes.value.name == loginForm[0].value || currRes.value.email == loginForm[0].value) && currRes.value.password == loginForm[1].value) {
                // console.log(currRes.value);
                localStorage.setItem("userKey", JSON.stringify(currRes.key));
                localStorage.setItem("code", "secret");
                // console.log(currRes.key);
                window.location.href = "../User/home.html";
            } else {
                currRes.continue();
                location.reload();
                // console.log('Enter valid details')
            }
        }
    }
}


// ADMIN DATABASE
var adminDetails = function (e) {
    // e.preventDefault();
    var idb = indexedDB.open('Accounts', 2);
    idb.onupgradeneeded = function () {
        var request = idb.result;
        request.createObjectStore('Admin', { autoIncrement: true });
    };

    idb.onsuccess = function (e) {
        e.preventDefault();
        var request = idb.result;
        var tx = request.transaction('Admin', 'readwrite');
        var store = tx.objectStore('Admin');

        // TO ADD ADMIN, DO IT STATICALLY

        // store.put({
        //     name: '',
        //     email: 'admin2@gamil.com',
        //     password: 'Admin@2',
        // });

    }
};
adminDetails();