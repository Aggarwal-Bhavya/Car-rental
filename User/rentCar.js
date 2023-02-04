console.log(JSON.parse(localStorage.getItem("carDetails")));
var rentedCar = JSON.parse(localStorage.getItem("carDetails"));
var cart = document.querySelector('.carContainer');
function generateItems() {
    if (rentedCar.length != 0) {
        // console.log('Available car');
        // console.log(parseInt(rentedCar.price));
        // var carPrice = parseInt(rentedCar.price)*24;
        // console.log(typeof(parseInt(rentedCar.price)));
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
                        <strong>₹${rentedCar.price}</strong>/hour
                    </p>

                    <div class="form-container">
                        <form class="bookingForm">
                            <div class="input-box">
                                <span>Location</span>
                                <input type="search" name="" id="" placeholder="Enter Location">
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
                            
                            <input type="button" name="" id="" class="btn" value="View Total Fare" onclick="fareCalculation()">
                            <h1 id="displayTotal"></h1>
                            <input type="button" name="" id="" class="btn" value="Confirm Booking" onclick="bookingAction()">

                            </div>
    </li>
</ul>
        `
    }
};

generateItems();

// Calculating fare based on user input
var form = document.querySelector('.bookingForm');
var total = document.getElementById('displayTotal');
var carPrice, date1, date2;

var fareCalculation = function() {
    date1 = new Date(form[1].value);
    date2 = new Date(form[2].value);
    // console.log(isValidDate(date1));
    // console.log(isValidDate(date2));
    
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log(today);

    // if(date1 >= today) console.log('valid date');

    var differenceInTime = date2.getTime() - date1.getTime();
    // console.log(differenceInTime);

    var differenceInDays = differenceInTime / (1000*3600*24);
    // console.log(differenceInDays);
    if(differenceInTime <= 0 || !isValidDate(date1) || !isValidDate(date2) || today > date1) {
        alert('Enter valid dates!');
    } else {
        carPrice = parseInt(rentedCar.price)*24*differenceInDays;
        // console.log(carPrice);
        
        total.innerText = 'Total Calculated Fare: ₹' + carPrice;   
    }
}

// check function for valid date input
var isValidDate = function(date) {
    return date instanceof Date && !isNaN(date);
}

// Processing booking based on user's input
var bookingAction = function() {
    console.log('Booking');
    console.log(carPrice);
    console.log(date1);
    console.log(date2);
}