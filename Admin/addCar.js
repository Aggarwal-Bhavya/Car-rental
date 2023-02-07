// CREATING NEW CAR DATA IN INDEXEDDB
var form = document.querySelector('.newCarForm');

var newCarAction = function () {
    var idb = indexedDB.open('All Cars', 2);

    idb.onerror = function (e) {
        console.log('Error faced!');
    };

    idb.onupgradeneeded = function () {
        var request = idb.result;
        request.createObjectStore('Cars', { autoIncrement: true });
    };

    idb.onsuccess = function (e) {
        var request = idb.result;
        var tx = request.transaction('Cars', 'readwrite');
        var store = tx.objectStore('Cars');

        if (checkEmpty()) {
            alert('New car added!');
            store.put({
                model: form[0].value,
                year: form[1].value,
                capacity: form[2].value,
                type: form[3].value,
                average: form[4].value,
                mode: form[5].value,
                price: form[6].value,
                availability: true,
                days: 0,
                revenue: 0,
            });
            window.location.href = "../Admin/allCars.html";
        } else {
            alert('Fill up all fields!');
            e.preventDefault();
        }
    }
};

function checkEmpty() {
    return (
        form[0].value != '' &&
        form[1].value != '' &&
        form[2].value != '' &&
        form[3].value != '' &&
        form[4].value != '' &&
        form[5].value != '' &&
        form[6].value != ''
    );
};