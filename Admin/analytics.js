var barColors = [
    "rgba(124, 148, 215, 1.0)",
    "rgba(124, 148, 215, 0.8)",
    "rgba(124, 148, 215, 0.6)",
    "rgba(124, 148, 215, 0.4)",
    "rgba(124, 148, 215, 0.2)",
];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var carValues = [];
var dayValues = [];
var revenueValues = [];

function read() {
    var idb = indexedDB.open('All Cars', 2);
    idb.onsuccess = function () {
        var request = idb.result;
        var transaction = request.transaction('Cars', 'readonly');
        var store = transaction.objectStore('Cars');
        var cursor = store.openCursor();

        cursor.onsuccess = function () {
            var currRes = cursor.result;
            if (currRes) {
                // ARRAY FOR CAR NAMES
                carValues.push(currRes.value.model);

                // ARRAY FOR DAYS A CAR IS BOOKED FOR
                dayValues.push(currRes.value.days);

                // TOTAL MONEY EARNT BY A TYPE OF CAR
                revenueValues.push(currRes.value.revenue);
                currRes.continue();
            } else {
                // BAR GRAPH: CAR VS DAYS BOOKED FOR
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

                // BAR GRAPH: CAR VS REVENUE GENERATED
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
var monthBookings = [];
var monthCount = {};


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
                // Array for all usernames
                userValues.push(currRes.value.name);

                // Array for booking count by a username
                // console.log(currRes.value.bookingHistory.length)
                bookingValues.push(currRes.value.bookingHistory.length);

                // total sum spent by a user
                var userBookings = currRes.value.bookingHistory;
                var sum = userBookings.reduce(function (acc, curr) {
                    return acc + curr.totalPay
                }, 0);
                totalPayValues.push(sum);

                // Based on month in each user booking history, we find month count for each user
                var count = userBookings.reduce(function (acc, curr) {
                    var month = curr.pickupDate.split('/')[0];
                    if (!acc[month]) {
                        acc[month] = 1;
                    } else {
                        acc[month]++;
                    }
                    return acc;
                }, {});
                monthBookings.push(count);
                // console.log(monthBookings);

                currRes.continue();
            } else {
                // PIE CHART: USERNAME VS BOOKING COUNT
                new Chart("myChart2", {
                    type: "pie",
                    data: {
                        labels: userValues,
                        datasets: [{
                            label: "Bookings by Username",
                            backgroundColor: barColors,
                            data: bookingValues
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Booking Count by Username"
                        }
                    }
                });

                // BAR GRAPH: USERNAME VS TOTAL PAY
                new Chart("myChart3", {
                    type: "bar",
                    data: {
                        labels: userValues,
                        datasets: [{
                            label: "Total payments by an account",
                            backgroundColor: 'rgba(124, 148, 215,0.6)',
                            data: totalPayValues
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Revenue generated by a user"
                        }
                    }
                });

                // From month count of each user, find total count of each month irrespective of user
                monthBookings.forEach(function (obj) {
                    Object.keys(obj).forEach(function (month) {
                        var monthName = months[month - 1];

                        if (!monthCount[monthName]) {
                            monthCount[monthName] = 0;
                        }
                        monthCount[monthName] += obj[month];
                    });
                });
                // console.log(monthCount);
                new Chart("myChart4", {
                    type: 'bar',
                    data: {
                        labels: Object.keys(monthCount),
                        datasets: [{
                            label: 'Month Count',
                            data: Object.values(monthCount),
                            backgroundColor: 'rgba(124, 148, 215,0.6)',
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Monthly Bookings"
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }
        }
    }
}

getData();