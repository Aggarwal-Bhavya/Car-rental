var carValues = [];
var dayValues = [];
var revenueValues = [];

function read() {
    // var chart2 = document.getElementById('myChart1');
    var idb = indexedDB.open('All Cars', 2);
    idb.onsuccess = function () {
        var request = idb.result;
        var transaction = request.transaction('Cars', 'readonly');
        var store = transaction.objectStore('Cars');
        var cursor = store.openCursor();
        cursor.onsuccess = function () {
            var currRes = cursor.result;
            if (currRes) {
                carValues.push(currRes.value.model);
                dayValues.push(currRes.value.days);
                revenueValues.push(currRes.value.revenue);
                currRes.continue();
            } else {
                new Chart("myChart", {
                    type: "bar",
                    data: {
                        labels: carValues,
                        datasets: [{
                            label: "Days Booked",
                            backgroundColor: 'rgba(124, 148, 215,0.6)',
                            data: dayValues
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Car Booking Day Count"
                        }
                    }
                });

                new Chart("myChart1", {
                    type: "bar",
                    data: {
                        labels: carValues,
                        datasets: [{
                            label: "Revenue Generated",
                            backgroundColor: 'rgba(124, 148, 215,0.6)',
                            data: revenueValues
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Car Booking Revenue"
                        }
                    }
                });


            }
        }
    }
    // console.log(xValues);
    // console.log(yValues);
};

read();

var userValues = [];
var bookingValues = [];
var totalPayValues = [];
function getData() {
    var idb = indexedDB.open('Accounts', 2);
    idb.onsuccess = function () {
        var request = idb.result;
        var transaction = request.transaction('User', 'readonly');
        var store = transaction.objectStore('User');
        var cursor = store.openCursor();
        cursor.onsuccess = function () {
            var currRes = cursor.result;
            if (currRes) {
                userValues.push(currRes.value.name);
                bookingValues.push(currRes.value.bookingHistory.length);
                
                currRes.continue();
            } else {
                new Chart("myChart2", {
                    type: "bar",
                    data: {
                        labels: userValues,
                        datasets: [{
                            label: "Bookings by Username",
                            backgroundColor: 'rgba(124, 148, 215,0.6)',
                            data: bookingValues
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Bookings by Username"
                        }
                    }
                });
            }
        }
    }
}

getData();