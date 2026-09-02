/* =========================
   HEADER
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================
   MOBILE MENU
========================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileNav =
    document.getElementById("mobileNav");

const mobileMenuIcon =
    mobileMenuBtn.querySelector("i");

function setMobileMenu(open) {

    mobileNav.classList.toggle("active", open);
    mobileMenuBtn.setAttribute("aria-expanded", String(open));
    mobileMenuBtn.setAttribute(
        "aria-label",
        open ? "إغلاق القائمة" : "فتح القائمة"
    );

    mobileMenuIcon.classList.toggle("fa-bars", !open);
    mobileMenuIcon.classList.toggle("fa-xmark", open);
}

mobileMenuBtn.addEventListener("click", () => {

    setMobileMenu(!mobileNav.classList.contains("active"));

});


document
    .querySelectorAll("#mobileNav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            setMobileMenu(false);

        });

    });

document.addEventListener("click", event => {

    if (
        mobileNav.classList.contains("active") &&
        !mobileNav.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)
    ) {
        setMobileMenu(false);
    }
});


/* =========================
   ACTIVE NAV
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================
   COUNTERS
========================= */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const duration = 1800;

        const startTime =
            performance.now();

        function update(time) {

            const progress =
                Math.min(
                    (time - startTime) / duration,
                    1
                );

            current =
                Math.floor(
                    progress * target
                );

            counter.textContent =
                current;

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target;

            }

        }

        requestAnimationFrame(update);

    });

}


const statsSection =
    document.querySelector(".stats");

const statsObserver =
    new IntersectionObserver(
        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },
        {
            threshold: 0.35
        }
    );

statsObserver.observe(statsSection);


/* =========================
   PROJECT FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        projectCards.forEach(card => {

            const category =
                card.dataset.category;

            const isVisible =
                filter === "all" ||
                category === filter;

            card.hidden = !isVisible;

        });

        projectIndex = 0;
        updateProjects();

    });

});





/* =========================
   PROJECT GALLERY
========================= */

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalMainImage = document.getElementById("modalMainImage");
const modalThumbnails = document.getElementById("modalThumbnails");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");

const projectsData = {

    project1: {
        title: " مول بوليفار ",
        category: "أعمال معمارية",
        description: "تنفيذ الوجهات الكلادينج و الزجاج",

        images: [
            "images/project-1.jpg",
            "images/project-1-1.jpg",
            "images/project-1-2.jpg",
            "images/project-1-3.jpg"
        ]
    },

    project2: {
        title: " مول بلازا",
        category: "أعمال معمارية",
        description: "تفيذ الوجهات  ",
        images: [
            "images/project-2.jpg",
            "images/project-2-1.jpg",
            "images/project-2-2.jpg",
            "images/project-2-3.jpg"
        ]
    },

    project3: {
        title: "مدينه المعرفه",
        category: "اعمال معمارية",
        description: "تصميم وتنفيذ الهيكل الخارجي للمشروع.",
        images: [
            "images/project-3.jpg",
            "images/project-3-1.jpg",
            "images/project-3-2.jpg",
            "images/project-3-3.jpg"
        ]
    },

    project4: {
        title: "مول دجلة وان",
        category: "أعمال معمارية",
        description: "تنفيذ الأعمال المعمارية لمشروع تجاري.",
        images: [
            "images/project-4.jpg",
            "images/project-4-1.jpg",
            "images/project-4-2.jpg",
            "images/project-4-3.jpg"
        ]
    },

    project5: {
        title: "مشروع  كوبري مشاة منتجع الجلالة",
        category: "أعمال إنشائية",
        description: "تنفيذ الأعمال الإنشائية  للكوبري.",
        images: [
            "images/project-5.jpg"
        ]
    },

    project6: {
        title: " direction white ",
        category: "أعمال معمارية",
        description: "تنفيذ ابواب و شبابيك و shutter",
        images: [
            "images/project-6.jpg",
            "images/project-6-1.jpg",
            "images/project-6-2.jpg",
            "images/project-6-3.jpg"
        ]
    },
    project7: {
        title: " Rendevous Pyramids Hotel ",
        category: "أعمال معمارية",
        description: "تنفيذ ابواب و شبابيك  ",
        images: [
            "images/project-7.jpg",
            "images/project-7-1.jpg",
            "images/project-7-2.jpg",
            "images/project-7-3.jpg"
        ]
    }

};


/* =========================
   OPEN GALLERY
========================= */

function openProjectGallery(projectId) {

    const project = projectsData[projectId];

    if (!project) {
        console.error("Project not found:", projectId);
        return;
    }

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;

    modalMainImage.src = project.images[0];
    modalMainImage.alt = project.title;

    modalThumbnails.innerHTML = "";

    project.images.forEach((image, index) => {

        const thumbnail = document.createElement("img");

        thumbnail.src = image;
        thumbnail.alt = project.title;
        thumbnail.className = "modal-thumb";

        if (index === 0) {
            thumbnail.classList.add("active");
        }

        thumbnail.addEventListener("click", function (event) {

            event.stopPropagation();

            modalMainImage.src = image;

            document
                .querySelectorAll(".modal-thumb")
                .forEach(item => {
                    item.classList.remove("active");
                });

            thumbnail.classList.add("active");

        });

        modalThumbnails.appendChild(thumbnail);

    });

    projectModal.classList.add("active");

    projectModal.setAttribute("aria-hidden", "false");
    projectModal.inert = false;

    document.body.classList.add("modal-open");

    modalClose.focus();
}


/* =========================
   CLOSE GALLERY
========================= */

function closeProjectGallery() {

    projectModal.classList.remove("active");

    projectModal.setAttribute("aria-hidden", "true");
    projectModal.inert = true;

    document.body.classList.remove("modal-open");

}


/* =========================
   PROJECT CLICK
========================= */

document.addEventListener("click", function (event) {

    const projectButton =
        event.target.closest(".project-overlay");

    if (!projectButton) return;

    event.preventDefault();
    event.stopPropagation();

    const projectId =
        projectButton.getAttribute("data-project");

    openProjectGallery(projectId);

});


/* =========================
   CLOSE BUTTON
========================= */

modalClose.addEventListener("click", function (event) {

    event.preventDefault();
    event.stopPropagation();

    closeProjectGallery();

});


/* =========================
   CLICK OUTSIDE
========================= */

projectModal.addEventListener("click", function (event) {

    if (
        event.target.classList.contains("modal-overlay") ||
        event.target === projectModal
    ) {

        closeProjectGallery();

    }

});


/* =========================
   ESCAPE
========================= */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        mobileNav.classList.contains("active")
    ) {
        setMobileMenu(false);
        mobileMenuBtn.focus();
    }

    if (
        event.key === "Escape" &&
        projectModal.classList.contains("active")
    ) {

        closeProjectGallery();

    }

});


/* =========================
   FORM SUCCESS
========================= */

const bookingForm =
    document.getElementById("bookingForm");

bookingForm.addEventListener("submit", () => {

    const submitButton =
        bookingForm.querySelector(".form-submit");

    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    submitButton.innerHTML =
        'جارٍ الإرسال <i class="fa-solid fa-spinner fa-spin"></i>';
});

const submissionParams =
    new URLSearchParams(window.location.search);

if (submissionParams.get("submitted") === "true") {

    const formStatus =
        document.getElementById("formStatus");

    formStatus.hidden = false;
    submissionParams.delete("submitted");

    const remainingQuery = submissionParams.toString();
    const cleanUrl =
        `${window.location.pathname}${remainingQuery ? `?${remainingQuery}` : ""}${window.location.hash}`;

    window.history.replaceState({}, "", cleanUrl);
}


/* =========================
   SMOOTH ANCHOR
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const targetPosition =
                    target.offsetTop -
                    headerHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

    /* =========================
   REVIEWS SLIDER
========================= */

const reviewsTrack =
    document.querySelector(".reviews-track");

const reviewsPrev =
    document.querySelector(".reviews-prev");

const reviewsNext =
    document.querySelector(".reviews-next");

const reviewCards =
    document.querySelectorAll(".review-card");

let reviewIndex = 0;


function getReviewsPerView() {

    if (window.innerWidth <= 600) {
        return 1;
    }

    if (window.innerWidth <= 820) {
        return 2;
    }

    return 3;
}


function updateReviews() {

    const perView =
        getReviewsPerView();

    const gap = 22;

    const cardWidth =
        reviewCards[0].getBoundingClientRect().width;

    const move =
        (cardWidth + gap) * reviewIndex;

    reviewsTrack.style.transform =
        `translateX(${move}px)`;

}


reviewsNext.addEventListener("click", () => {

    const perView =
        getReviewsPerView();

    const maxIndex =
        reviewCards.length - perView;

    if (reviewIndex < maxIndex) {

        reviewIndex++;

    } else {

        reviewIndex = 0;

    }

    updateReviews();

});


reviewsPrev.addEventListener("click", () => {

    const perView =
        getReviewsPerView();

    const maxIndex =
        reviewCards.length - perView;

    if (reviewIndex > 0) {

        reviewIndex--;

    } else {

        reviewIndex = maxIndex;

    }

    updateReviews();

});


window.addEventListener(
    "resize",
    () => {

        const perView =
            getReviewsPerView();

        const maxIndex =
            reviewCards.length - perView;

        if (reviewIndex > maxIndex) {
            reviewIndex = maxIndex;
        }

        updateReviews();

    }
);
/* =========================
   PROJECTS SLIDER
========================= */

const projectsTrack =
    document.querySelector(".projects-track");

const projectsPrev =
    document.querySelector(".projects-prev");

const projectsNext =
    document.querySelector(".projects-next");


let projectIndex = 0;


function getProjectsPerView() {

    if (window.innerWidth <= 600) {
        return 1;
    }

    return 2;
}


function getVisibleProjectCards() {

    return Array.from(
        document.querySelectorAll(".projects-track .project-card")
    ).filter(card => !card.hidden);
}


function updateProjects() {

    const projectCards = getVisibleProjectCards();

    if (!projectCards.length) return;

    const cardWidth =
        projectCards[0].getBoundingClientRect().width;

    const gap =
        window.innerWidth <= 600
            ? 15
            : 30;

    const move =
        (cardWidth + gap) * projectIndex;

    projectsTrack.style.transform =
        `translateX(${move}px)`;

}


projectsNext.addEventListener("click", () => {

    const projectCards = getVisibleProjectCards();

    const perView =
        getProjectsPerView();

    const maxIndex =
        Math.max(0, projectCards.length - perView);

    if (projectIndex < maxIndex) {

        projectIndex++;

    } else {

        projectIndex = 0;

    }

    updateProjects();

});


projectsPrev.addEventListener("click", () => {

    const projectCards = getVisibleProjectCards();

    const perView =
        getProjectsPerView();

    const maxIndex =
        Math.max(0, projectCards.length - perView);

    if (projectIndex > 0) {

        projectIndex--;

    } else {

        projectIndex = maxIndex;

    }

    updateProjects();

});


window.addEventListener(
    "resize",
    () => {

        const projectCards = getVisibleProjectCards();

        const perView =
            getProjectsPerView();

        const maxIndex =
            Math.max(
                0,
                projectCards.length - perView
            );

        if (projectIndex > maxIndex) {
            projectIndex = maxIndex;
        }

        updateProjects();

    }
);

updateProjects();
