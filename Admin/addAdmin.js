// VIEW PASSWORD FEATURE
var container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password");
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

// ADDING ADMIN
var form = document.querySelector('.adminForm');

var adminAction = function () {
    var idb = indexedDB.open('Accounts', 2);

    idb.onerror = function (e) {
        console.log('Error faced!');
    };

    idb.onupgradeneeded = function () {
        var request = idb.result;
        request.createObjectStore('Admin', { autoIncrement: true });
    };
    idb.onsuccess = function (e) {
        // e.preventDefault();
        var request = idb.result;
        var foundUsername = false;
        var foundEmail = false;
        var tx = request.transaction('Admin', 'readwrite');
        var store = tx.objectStore('Admin');
        var cursor = store.openCursor();

        cursor.onsuccess = function(e) {
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
                    alert('Admin name already exists!');
                } else {
                    if (checkEmpty()) {
                            store.put({
                                name: form[0].value,
                                email: form[1].value,
                                password: form[2].value,
                            });
                            alert('New Admin Addition Successful!');
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
//     idb.onsuccess = function (e) {
//         // e.preventDefault();
//         var request = idb.result;
//         var foundAdmin = false;
//         var foundEmail = false;
//         var tx = request.transaction('Admin', 'readwrite');
//         var store = tx.objectStore('Admin');
//         var cursor = store.openCursor();

//         cursor.onsuccess = function () {
//             var currRes = cursor.result;
//             if (currRes) {
//                 if (currRes.value.name == form[0].value) {
//                     foundAdmin = true;
//                 }
//                 if (currRes.value.email == form[1].value) {
//                     foundEmail = true;
//                 }
//                 currRes.continue();
//             } else {
//                 if (foundEmail) {
//                     alert('Email already exists!');
                   
//                 } else if (foundAdmin) {
//                     alert('Username already exists!');
//                 } else {
//                     if (checkEmpty()) {
//                         store.put({
//                             name: form[0].value,
//                             email: form[1].value,
//                             password: form[2].value,
//                         });
//                         alert('New Admin Addition Successful!');
//                         location.reload();

//                     } else {
//                         alert('Fill up all fields!')
//                         e.preventDefault();
//                     }
//                 }
//             }
//         }
//     }
// };

function checkEmpty() {
    return (
        form[0].value != '' &&
        form[1].value != '' &&
        form[2].value != ''
    );
}

// LOGIN FOR ADMIN
var adminLogin = document.querySelector('.adminLoginForm');

var addLoginAction = function () {
    var idb = indexedDB.open('Accounts', 2);

    idb.onsuccess = function (e) {
        var request = idb.result;

        var tx = request.transaction('Admin', 'readonly');
        var store = tx.objectStore('Admin');
        var cursor = store.openCursor();

        cursor.onsuccess = function () {
            let currRes = cursor.result;
            if ((currRes.value.name == adminLogin[0].value || currRes.value.email == adminLogin[0].value) && currRes.value.password == adminLogin[1].value) {
                // console.log('Admin signed in');
                localStorage.setItem("adminCode", "adminSecret");
                window.location.href = "home.html";
            } else {
                currRes.continue();
                location.reload();
            }
        }

    }
}