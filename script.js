/* 1. MOBILE NAVIGATION */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu after selecting a section
document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


/* 2. PROJECT CATEGORY FILTERING */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const category = button.dataset.filter;

        // Update the active filter button
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Display projects based on the selected category
        projectCards.forEach(function (card) {
            if (category === "all" ||
                card.dataset.category === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* 3. BACK TO TOP BUTTON */
const backToTop = document.getElementById("back-to-top");

// Show the button when the visitor scrolls down
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// Return to the top when clicked
backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* 4. WELCOME MESSAGE */
const welcomeButton = document.getElementById("welcome-button");
const welcomeMessage = document.getElementById("welcome-message");

welcomeButton.addEventListener("click", function () {
    welcomeMessage.textContent =
        "Thank you for visiting my portfolio! Have a lovely day.";
});


/* 5. ACTIVE NAVIGATION LINK */
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

