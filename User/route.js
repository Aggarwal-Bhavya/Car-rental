// // creating document click which watches the nav links only
// document.addEventListener("click",(e) => {
//     const { target } = e;
//     if(!target.matches("nav ul li a")) {
//         // console.log('not nav-click')
//         return;
//     }
//     // console.log('nav-click')
//     e.preventDefault();
//     route();
// });

// // creating routes
// const routes = {
//     "/about": {
//         template: "about.html",
//         title: "About Us",
//         description: "This is the about page",
//     },
//     "/rent": {
//         template: "contact.html",
//         title: "Contact Us",
//         description: "This is the contact page",
//     },
//     "/cars": {
//         template: "cars.html",
//         title: "About Us",
//         description: "This is the about page",
//     },
// };

// // function watching the url and calls the urlLocationHandler
// const route = function(event) {
//     event = event || window.event;
//     event.preventDefault();
//     // window.history.pushstate(state, unused, target link)
//     window.history.pushState({}, "", event.target.href);
//     locationHandler();
// };

// // URL location handling function
// const locationHandler = async function() {
//     const location = window.location.pathname;
//     if(location.length == 0) {
//         location = "/cars";
//     }

//     const route = routes[location];
//     const html = await fetch(route.template).then((response) => response.text());
//     document.getElementById('root').innerHTML = html;
//     document.title = route.title;
// };

// window.onpopstate = locationHandler;
// window.route = route;
// locationHandler();

// document.addEventListener("click", (e) => {
//     const { target } = e;
//     if (!target.matches("nav ul li a")) {
//         return;
//     }
//     e.preventDefault();
//     route();
// });

// const routes = {
//     "#cars": {
//         template: "cars.html",
//         title: "Home",
//         description: "This is the home page",
//     },
//     "#about": {
//         template: "about.html",
//         title: "About Us",
//         description: "This is the about page",
//     },
//     "#rent": {
//         template: "rent.html",
//         title: "Contact Us",
//         description: "This is the contact page",
//     },
// };

// const route = (event) => {
//     event = event || window.event; // get window.event if event argument not provided
//     event.preventDefault();
//     // window.history.pushState(state, unused, target link);
//     window.history.pushState({}, "", event.target.href);
//     locationHandler();
// };

// const locationHandler = async () => {
//     const location = window.location.pathname; // get the url path
//     // if the path length is 0, set it to primary page route
//     if (location.length == 0) {
//         location = "#cars";
//     }
//     // get the route object from the urlRoutes object
//     const route = routes[location];
//     // get the html from the template
//     const html = await fetch(route.template).then((response) => response.text());
//     // set the content of the content div to the html
//     document.getElementById("root").innerHTML = html;
//     // set the title of the document to the title of the route
//     document.title = route.title;
// };

// window.onpopstate = locationHandler;
// // call the urlLocationHandler function to handle the initial url
// window.route = route;
// // call the urlLocationHandler function to handle the initial url
// locationHandler();