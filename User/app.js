// CREATING NEW CAR DATA IN INDEXEDDB
const form = document.querySelector('.newCarForm');

const newCarAction = function () {
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
            location.reload();
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


const divContainer = document.querySelector('.carContainer');


function read() {
    var idb = indexedDB.open('All Cars', 2);
    idb.onsuccess = function () {
        let request = idb.result;
        let transaction = request.transaction('Cars', 'readonly');
        let store = transaction.objectStore('Cars');
        let cursor = store.openCursor();

        cursor.onsuccess = function () {
            let currRes = cursor.result;
            if (currRes) {
                console.log(currRes.value.model);
                divContainer.innerHTML += `
                <ul class="featured-car-list">
                <li>
                <div class="featured-car-card">

                    <div class="card-content">

                        <div class="card-title-wrapper">
                            <h3 class="h3 card-title">
                                <a href="#">${currRes.value.model}</a>
                            </h3>

                            <data class="year">${currRes.value.year}</data>
                        </div>

                        <ul class="card-list">

                            <li class="card-list-item">
                                <ion-icon name="people-outline"></ion-icon>

                                <span class="card-item-text">${currRes.value.capacity} People</span>
                            </li>

                            <li class="card-list-item">
                                <ion-icon name="flash-outline"></ion-icon>

                                <span class="card-item-text">${currRes.value.type}</span>
                            </li>

                            <li class="card-list-item">
                                <ion-icon name="speedometer-outline"></ion-icon>

                                <span class="card-item-text">${currRes.value.average}km/1-litre</span>
                            </li>

                            <li class="card-list-item">
                                <ion-icon name="hardware-chip-outline"></ion-icon>

                                <span class="card-item-text">${currRes.value.mode}</span>
                            </li>

                        </ul>

                        <div class="card-price-wrapper">

                            <p class="card-price">
                                <strong>₹${currRes.value.price}</strong>/day
                            </p>

                            <button class="btn fav-btn">
                                <ion-icon name="checkmark" id="availableIcon" style="display: block;"></ion-icon> 
                                <ion-icon name="ban" id="unavailableIcon" style="display: none;"></ion-icon>
                            </button>

                            <button class="btn" onclick="rentAction(${currRes.key});">Rent now</button>

                        </div>

                    </div>

                </div>
            </li>
        </ul>
                `
                // console.log(currRes.value.availability);
                const availableIcon = document.getElementById('availableIcon');
                const unavailableIcon = document.getElementById('unavailableIcon');
                if (currRes.value.availability) {
                    // console.log(currRes.value.availability);
                    availableIcon.style.display = 'block';
                    unavailableIcon.style.display = 'none';
                }
                currRes.continue();
            }
        }
    }
};

read();

// Rent Action
// let rentKey;
// const rentAction = function (key) {
//     console.log('rent action triggered');
//     rentKey = key;
//     console.log(rentKey);
//     // location.href = 'rent.html';
//     var idb = indexedDB.open('All Cars', 2);
//     idb.onsuccess = function () {
//         let request = idb.result;
//         let transaction = request.transaction('Cars', 'readwrite');
//         let store = transaction.objectStore('Cars');
//         const data = store.get(key);
//         // console.log(data);
//         data.onsuccess = function(event) {
//             console.log(event.target.result);
//         }
//     }
// }