console.log(JSON.parse(localStorage.getItem("carDetails")));
var rentedCar = JSON.parse(localStorage.getItem("carDetails"));
var cart = document.querySelector('.carContainer');
function generateItems() {
    if (rentedCar.length != 0) {
        console.log('Available car');
        cart.innerHTML = `
        <div class="title-wrapper">
            <h2 class="h2 section-title" style="margin-left: 10px;">Booking Window</h2>
        </div>
        <ul class="featured-car-list">
        <li>
        <div class="featured-car-card">

            <div class="card-content">

                <div class="card-title-wrapper">
                    <h3 class="h3 card-title">
                        <a href="#">${rentedCar.model}</a>
                    </h3>

                    <data class="year">${rentedCar.year}</data>
                </div>

                <ul class="card-list">

                    <li class="card-list-item">
                        <ion-icon name="people-outline"></ion-icon>

                        <span class="card-item-text">${rentedCar.capacity} People</span>
                    </li>

                    <li class="card-list-item">
                        <ion-icon name="flash-outline"></ion-icon>

                        <span class="card-item-text">${rentedCar.type}</span>
                    </li>

                    <li class="card-list-item">
                        <ion-icon name="speedometer-outline"></ion-icon>

                        <span class="card-item-text">${rentedCar.average}km/1-litre</span>
                    </li>

                    <li class="card-list-item">
                        <ion-icon name="hardware-chip-outline"></ion-icon>

                        <span class="card-item-text">${rentedCar.mode}</span>
                    </li>

                </ul>

                <div class="card-price-wrapper">

                    <p class="card-price">
                        <strong>₹${rentedCar.price}</strong>/day
                    </p>

                    <div class="form-container">
                        <form class="bookingForm">
                            <div class="input-box">
                                <span>Location</span>
                                <input type="search" name="" id="" placeholder="Search Places">
                            </div>

                            <div class="input-box">
                                <span>Pick-Up Date</span>
                                <input type="date" name="" id="">
                            </div>

                            <div class="input-box">
                                <span>Return Date</span>
                                <input type="date" name="" id="">
                            </div>

                            </form>
                            </div>
                            </div>
                            
                            </div>
                            
                            <input type="submit" name="" id="" class="btn" value="Book Now" onclick="bookingAction()">
                            </div>
    </li>
</ul>
        `
    }
};

generateItems();

// Based on form-container values, update data
const form = document.querySelector('.bookingForm');

const bookingAction = function() {
    alert('Booking successful!');
    console.log('Booked');
}

function values() {
    console.log(form[0].value)
};

values();