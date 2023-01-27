let rentKey;
let carDetails;
const rentAction = function (key) {
    console.log('rent action triggered');
    rentKey = key;
    console.log(rentKey);
    var idb = indexedDB.open('All Cars', 2);
    idb.onsuccess = function () {
        let request = idb.result;
        let transaction = request.transaction('Cars', 'readwrite');
        let store = transaction.objectStore('Cars');
        const data = store.get(rentKey);
        // console.log(data);
        data.onsuccess = function(event) {
            // console.log(event.target.result);
            carDetails = event.target.result;
            console.log(carDetails);
            localStorage.setItem('carDetails', JSON.stringify(carDetails));
        }
    }
    location.href = 'rent.html';
}
