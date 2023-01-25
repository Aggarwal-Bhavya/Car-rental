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
    return form[0].value != '' && form[1].value != '' && form[2].value != '' && form[3].value != '';
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
                window.location.href = "../Homepages/home.html";
                currRes.continue();
            } else {
                console.log('Enter valid details')
            }
        }
    }
}