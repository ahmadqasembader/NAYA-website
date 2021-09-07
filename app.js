"using strict";
const navEl = document.querySelector(".nav_links");
const logo = document.querySelector(".logo");
const header = document.querySelector(".header");
const navbar = document.querySelector(".sticky_nav");
const links = document.querySelectorAll(".nav_link");
const navLinks = document.querySelector('.nav_links');
const numbers = document.querySelector(".numbers_container");
const headerCoords = navbar.getBoundingClientRect();
const scrollTopBtn = document.querySelector("#scrollTop");
const slides = document.querySelectorAll(".my_slides");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const arrows = document.querySelectorAll('.arrows');

const handleHover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav_link");
    //add the active class to the hovered element
    siblings.forEach((el) => el.classList.remove("active"));
    link.classList.add("active");
    //remove the active class
    if (this) link.classList.remove("active");
    //fade out & in
    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = this;
    });
  }
};

navEl.addEventListener("mouseover", handleHover.bind(0.5));
navEl.addEventListener("mouseout", handleHover.bind(1));

// sticky navbar

const navOptions = {
  root: null,
  rootMargin: `-${headerCoords.height}px`,
};

const stickyNav = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navbar.classList.contains("sticky")
        ? navbar.classList.remove("sticky")
        : undefined;
      links.forEach((link) => link.classList.remove("nav_link-reverse"));
    } else if (!entry.isIntersecting) {
      navbar.classList.add("sticky");
      links.forEach((link) => link.classList.add("nav_link-reverse"));
    }
  });
};
const headerObserver = new IntersectionObserver(stickyNav, navOptions);

headerObserver.observe(header);

// slider auto/manual navigation
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("my_slides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// animated number counter
let initiative, people, project, trainHours;

const numbers_init = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    else if (entry.isIntersecting) {
      initiative = setInterval(InitivtiveDone, 3);
      people = setInterval(peopleJoined, 3);
      project = setInterval(ProjectDone, 3);
      trainHours = setInterval(trainingHours, 3);
    }
  });
};
const numbersObserver = new IntersectionObserver(numbers_init);
numbersObserver.observe(numbers);
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;

const el = document.querySelector("#value1");
const elCoords = el.getBoundingClientRect();

function InitivtiveDone() {
  count1++;
  document.querySelector("#value1").innerHTML = count1;
  if (count1 >= 213) {
    clearInterval(initiative);
  } else return;
}

function peopleJoined() {
  count2 += 50;
  document.querySelector("#value2").innerHTML = count2;
  if (count2 >= 26500) {
    clearInterval(people);
  } else return;
}

function ProjectDone() {
  count3++;
  document.querySelector("#value3").innerHTML = count3;
  if (count3 >= 48) {
    clearInterval(project);
  } else return;
}

function trainingHours() {
  count4 += 25;
  document.querySelector("#value4").innerHTML = count4;
  if (count4 >= 9700) {
    clearInterval(trainHours);
  } else return;
}

// scroll up to top buttom
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

const topFunction = function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// Modal window

const openModal = function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".my_slides");
  console.log(clicked);
  if (clicked.classList.contains("fade")) console.log(clicked);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

slides.forEach((slide) => slide.addEventListener("click", openModal));

//   slides.addEventListener('click', closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Smooth scroll

const scrollTo = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('nav_link')){
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
navLinks.addEventListener('click', scrollTo);

