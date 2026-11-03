/* ========================================
   1. MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

// Open and close the mobile navigation menu
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a navigation link
navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


/* ========================================
   2. PROJECT CATEGORY FILTERING
======================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Update the active filter button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        // Display projects matching the selected category
        projectCards.forEach(card => {
            const projectCategory = card.dataset.category;

            if (
                selectedFilter === "all" ||
                selectedFilter === projectCategory
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});


/* ========================================
   3. BACK TO TOP BUTTON
======================================== */

const backToTop = document.getElementById("back-to-top");

// Show the button after scrolling down
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

// Smoothly return to the top of the page
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ========================================
   4. WELCOME MESSAGE
======================================== */

const welcomeButton = document.getElementById("welcome-button");
const welcomeMessage = document.getElementById("welcome-message");

welcomeButton.addEventListener("click", () => {
    welcomeMessage.textContent =
        "Thank you for visiting my portfolio. Have a lovely day!";
});


/* ========================================
   5. ACTIVE NAVIGATION HIGHLIGHT
======================================== */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);


/* ========================================
   6. DARK AND LIGHT MODE TOGGLE
======================================== */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load the previously saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

// Update the toggle icon and accessibility label
function updateThemeButton(theme) {
    if (theme === "dark") {
        themeIcon.textContent = "☀";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeIcon.textContent = "☾";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
}

updateThemeButton(savedTheme);

// Switch between dark and light themes
themeToggle.addEventListener("click", () => {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    // Save the selected theme for future visits
    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeButton(newTheme);
});


/* ========================================
   7. PROJECT DETAILS MODAL
======================================== */

const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");

const modalImage = document.getElementById("modal-image");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalSkills = document.getElementById("modal-skills");

let previousActiveElement = null;

// Project information displayed inside the modal
const projectDetails = {

    "sarawak-lingo": {
        image: "images/project1.jpg",
        category: "Mobile Application Development",
        title: "Sarawak Lingo",
        description:
            "Sarawak Lingo is an educational mobile application developed by a six-member team to help young Sarawakians prepare for elementary school through a culturally relevant Malay language curriculum. The application features interactive lessons, quizzes and gamified exercises to make language learning more engaging. The project received a Silver Award in Category A – Student (Science & Technology) at PIITRAM 2024.",
        skills: [
            "Mobile Application",
            "Educational Technology",
            "Gamification",
            "Glide"
        ]
    },

    "kuching-art": {
        image: "images/project2.jpg",
        category: "UI/UX Design",
        title: "Kuching ART Mobile Application",
        description:
            "This project involved designing a UI/UX prototype for the Autonomous Rapid Transit (ART) system in Kuching. User research was conducted through interviews with tourists, working adults, non-working adults and senior citizens. The findings informed the design of features intended to improve accessibility, convenience and the overall public transport experience.",
        skills: [
            "UI/UX Design",
            "User Research",
            "Figma",
            "Prototyping"
        ]
    },

    "life-below-water": {
        image: "images/project3.jpg",
        category: "Game Development",
        title: "Life Below Water",
        description:
            "Life Below Water is an educational game inspired by United Nations Sustainable Development Goal 14, which focuses on conserving marine life. My contributions included developing the Main Menu with captain name input and validation, implementing Home Page navigation with rank and experience point displays, creating an animated ocean scene with fish, bubbles and seaweed, and integrating the Learning Module, Quiz Module and Leaderboard.",
        skills: [
            "Game Development",
            "Java",
            "UI Design",
            "Animation"
        ]
    },

    "marine-conservation": {
        image: "images/project4.jpg",
        category: "2D Game Development",
        title: "Marine Conservation 2D Game",
        description:
            "This computer graphics project is a 2D game that raises awareness of coastal erosion and its impact on sea turtle nesting habitats. Players take on the role of a lifeguard and conservationist who must collect falling turtle eggs from eroded coastal soil. The gameplay introduces an environmental conservation topic through an interactive experience.",
        skills: [
            "Computer Graphics",
            "2D Game",
            "Game Mechanics",
            "Environmental Awareness"
        ]
    },

    "online-auction": {
        image: "images/project5.jpg",
        category: "Web Development",
        title: "Online Auction Marketplace",
        description:
            "This project involved developing a web-based auction marketplace connected to a MySQL database and hosted locally. The system manages user accounts, item categories, item descriptions, starting prices, reserve prices, Buy Now prices, auction dates and auction statuses. It demonstrates the use of web technologies and database management in an online marketplace.",
        skills: [
            "Web Development",
            "HTML",
            "MySQL",
            "Database Management"
        ]
    }
};

// Open the project details modal
document.querySelectorAll(".view-details").forEach(button => {
    button.addEventListener("click", () => {

        const projectId = button.dataset.project;
        const project = projectDetails[projectId];

        if (!project) {
            return;
        }

        previousActiveElement = document.activeElement;

        // Insert the selected project's information
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalCategory.textContent = project.category;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        // Display the project's skills
        modalSkills.replaceChildren();

        project.skills.forEach(skill => {
            const skillTag = document.createElement("span");
            skillTag.textContent = skill;
            modalSkills.appendChild(skillTag);
        });

        // Display the modal
        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
        modalClose.focus();
    });
});

// Close the modal and restore the previous page state
function closeProjectModal() {
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (previousActiveElement) {
        previousActiveElement.focus();
    }
}

// Close using the close button
modalClose.addEventListener("click", closeProjectModal);

// Close by clicking outside the modal content
projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

// Close using the Escape key
document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        projectModal.classList.contains("active")
    ) {
        closeProjectModal();
    }
});


/* ========================================
   8. COPY EMAIL ADDRESS
======================================== */

const copyEmailButton = document.getElementById("copy-email");
const copyMessage = document.getElementById("copy-message");

const emailAddress = "feliciafrela@gmail.com";

copyEmailButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(emailAddress);

        copyMessage.textContent = "Email address copied!";
        copyEmailButton.textContent = "Copied!";

    } catch (error) {
        copyMessage.textContent =
            "Unable to copy automatically. Please use the email link.";

        copyEmailButton.textContent = "Copy Email";
    }
});


/* ========================================
   9. SCROLL PROGRESS INDICATOR
======================================== */

const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
        scrollProgress.style.width = "0%";
        return;
    }

    const scrollPercentage =
        (window.scrollY / scrollableHeight) * 100;

    scrollProgress.style.width = `${scrollPercentage}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);


/* ========================================
   10. DYNAMIC FOOTER YEAR
======================================== */

document.getElementById("current-year").textContent =
    new Date().getFullYear();
