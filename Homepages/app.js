// CREATING NEW CAR DATA IN INDEXEDDB
const form = document.querySelector('.newCarForm');

const newCarAction = function() {
    var idb = indexedDB.open('New Car', 1);

    idb.onerror = function(e) {
        console.log('Error faced!');
    };

    idb.onupgradeneeded = function() {
        var request = idb.result;
        request.createObjectStore('Cars', { autoIncrement: true});
    };

    idb.onsuccess = function(e) {
        var request = idb.result;
        var tx = request.transaction('Cars', 'readwrite');
        var store = tx.objectStore('Cars');

        if(checkEmpty()) {
            alert('New car added!');
            store.put({
                model: form[0].value,
                year: form[1].value,
                capacity: form[2].value,
                type: form[3].value,
                average: form[4].value,
                mode: form[5].value,
                price: form[6].value
            });
            
        } else {
            alert('Fill up all fields!');

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
}