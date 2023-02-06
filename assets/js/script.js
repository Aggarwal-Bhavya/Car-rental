'use strict';

/**
 * navbar toggle
 */

var overlay = document.querySelector("[data-overlay]");
var navbar = document.querySelector("[data-navbar]");
var navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
var navbarLinks = document.querySelectorAll("[data-nav-link]");

var navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

var header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});