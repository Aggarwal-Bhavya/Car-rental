// DISPLAYING ALL CAR INFO
var divContainer = document.querySelector('.carContainer');


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
                                <strong>₹${currRes.value.price}</strong>/hour
                            </p>

                            <button class="btn fav-btn">
                                <ion-icon name="checkmark" id="availableIcon" style="display: block;"></ion-icon> 
                                <ion-icon name="ban" id="unavailableIcon" style="display: none;"></ion-icon>
                            </button>

                        </div>

                    </div>

                </div>
            </li>
        </ul>
                `
                // console.log(currRes.value.availability);
                var availableIcon = document.getElementById('availableIcon');
                var unavailableIcon = document.getElementById('unavailableIcon');
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