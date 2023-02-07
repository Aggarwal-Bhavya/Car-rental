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
        var tx = request.transaction('Admin', 'readwrite');
        var store = tx.objectStore('Admin');

        if (checkEmpty()) {
            alert('New Admin Addition Successful!');
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
        form[2].value != ''
    );
}
