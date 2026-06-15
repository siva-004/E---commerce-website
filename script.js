// ===============================
// MOBILE MENU TOGGLE
// ===============================

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// ===============================
// COLLECTION SEARCH & FILTER
// ===============================

const searchInput = document.getElementById("search");
const products = document.querySelectorAll(".product");
const checkboxes = document.querySelectorAll(".filter-checkbox");

function filterProducts() {

    const searchValue = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    const selectedFilters = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedFilters.push(
                checkbox.value.toLowerCase()
            );
        }
    });

    let visibleCount = 0;

    products.forEach((product) => {

        const productName = product.dataset.name 
            ? product.dataset.name.toLowerCase() 
            : "";

        const productCategory = product.dataset.category 
            ? product.dataset.category.toLowerCase() 
            : "";

        const matchesSearch = productName.includes(searchValue);

        let matchesFilter = true;

        if (selectedFilters.length > 0) {
            matchesFilter = selectedFilters.includes(productCategory);
        }

        if (matchesSearch && matchesFilter) {
            product.style.display = "block";
            visibleCount++;
        } else {
            product.style.display = "none";
        }
    });

    // Show/hide no results message
    const noResults = document.getElementById("no-results");
    if (noResults) {
        if (visibleCount === 0) {
            noResults.classList.remove("hidden");
        } else {
            noResults.classList.add("hidden");
        }
    }
}

// ===============================
// SEARCH EVENT
// ===============================

if (searchInput) {
    searchInput.addEventListener("keyup", filterProducts);
}

// ===============================
// FILTER EVENT
// ===============================

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
});

// ===============================
// NEWSLETTER SUBSCRIBE
// ===============================

const newsletterBtn = document.getElementById("newsletter-btn");

if (newsletterBtn) {
    newsletterBtn.addEventListener("click", () => {
        const emailInput = document.getElementById("newsletter-email");
        if (emailInput && emailInput.value.trim() === "") {
            alert("❌ Please enter your email address!");
            emailInput.style.borderColor = "red";
            setTimeout(() => {
                emailInput.style.borderColor = "#d1d5db";
            }, 2000);
        } else if (emailInput) {
            alert("✅ Thank you for subscribing to Nostra!");
            emailInput.value = "";
            emailInput.style.borderColor = "#d1d5db";
        }
    });
}

// ===============================
// SHOP NOW BUTTON
// ===============================

const shopNowBtn = document.getElementById("shop-now-btn");

if (shopNowBtn) {
    shopNowBtn.addEventListener("click", () => {
        window.location.href = "collection.html";
    });
}

// ===============================
// CONTACT FORM WITH VALIDATION
// ===============================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("contact-name");
        const email = document.getElementById("contact-email");
        const subject = document.getElementById("contact-subject");
        const message = document.getElementById("contact-message");

        let isValid = true;

        // Reset border colors
        const inputs = [name, email, subject, message];
        inputs.forEach(input => {
            if (input) {
                input.classList.remove("border-red-500");
                input.classList.add("border-gray-300");
            }
        });

        // Validate each field
        if (name && name.value.trim() === "") {
            isValid = false;
            name.classList.remove("border-gray-300");
            name.classList.add("border-red-500");
            name.placeholder = "❌ Name is required!";
            setTimeout(() => {
                name.placeholder = "Enter your name";
            }, 2000);
        }

        if (email && email.value.trim() === "") {
            isValid = false;
            email.classList.remove("border-gray-300");
            email.classList.add("border-red-500");
            email.placeholder = "❌ Email is required!";
            setTimeout(() => {
                email.placeholder = "Enter your email";
            }, 2000);
        } else if (email && email.value.trim() !== "") {
            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                isValid = false;
                email.classList.remove("border-gray-300");
                email.classList.add("border-red-500");
                alert("❌ Please enter a valid email address!");
            }
        }

        if (subject && subject.value.trim() === "") {
            isValid = false;
            subject.classList.remove("border-gray-300");
            subject.classList.add("border-red-500");
            subject.placeholder = "❌ Subject is required!";
            setTimeout(() => {
                subject.placeholder = "Enter subject";
            }, 2000);
        }

        if (message && message.value.trim() === "") {
            isValid = false;
            message.classList.remove("border-gray-300");
            message.classList.add("border-red-500");
            message.placeholder = "❌ Message is required!";
            setTimeout(() => {
                message.placeholder = "Write your message...";
            }, 2000);
        }

        if (isValid) {
            alert("✅ Your message has been sent successfully!");
            contactForm.reset();
        } else {
            alert("❌ Please fill in all fields correctly.");
        }
    });
}

// ===============================
// ADD TO CART FUNCTIONALITY
// ===============================

const addToCartButtons = document.querySelectorAll(".product button");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        const productCard = button.closest(".product");
        const productName = productCard.querySelector("h3").innerText;
        const productPrice = productCard.querySelector(".text-red-500").innerText;
        
        // Create floating notification
        const notification = document.createElement("div");
        notification.innerHTML = `✅ ${productName} added to cart! (${productPrice})`;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = "slideOut 0.3s ease-out";
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    });
});

// ===============================
// ANIMATION STYLES
// ===============================

const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .product {
        animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #ef4444, #000000);
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #dc2626, #1a1a1a);
    }
`;

document.head.appendChild(styleSheet);

// ===============================
// PAGE LOADING ANIMATION
// ===============================

window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});

// ===============================
// SMOOTH SCROLL FOR NAVIGATION
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ===============================
// PRODUCT HOVER EFFECT
// ===============================

const productCards = document.querySelectorAll(".product");

productCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "all 0.3s ease";
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});

// ===============================
// SEARCH INPUT CLEAR BUTTON
// ===============================

if (searchInput) {
    // Add clear button functionality
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            searchInput.value = "";
            filterProducts();
        }
    });
}

// ===============================
// FILTER RESET FUNCTION
// ===============================

const filterReset = () => {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    if (searchInput) {
        searchInput.value = "";
    }
    filterProducts();
};

// Add reset button if needed
const filterSection = document.querySelector(".bg-white.shadow-lg.rounded-xl.p-6.h-fit");
if (filterSection && !document.getElementById("reset-filters")) {
    const resetBtn = document.createElement("button");
    resetBtn.id = "reset-filters";
    resetBtn.innerHTML = "🔄 Reset All Filters";
    resetBtn.className = "w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold";
    resetBtn.onclick = filterReset;
    filterSection.appendChild(resetBtn);
}

// ===============================
// DYNAMIC YEAR IN FOOTER
// ===============================

const footerYear = document.querySelector("footer p");
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `© ${currentYear} Nostra. All Rights Reserved.`;
}

// ===============================
// WELCOME MESSAGE FOR FIRST TIME VISITORS
// ===============================

if (!localStorage.getItem("visited")) {
    setTimeout(() => {
        const welcomeMsg = document.createElement("div");
        welcomeMsg.innerHTML = "👋 Welcome to Nostra! Explore our latest fashion collections.";
        welcomeMsg.style.cssText = `
            position: fixed;
            top: 80px;
            left: 20px;
            background: linear-gradient(135deg, #ef4444, #000000);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: bold;
            z-index: 999;
            animation: slideIn 0.5s ease-out;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(welcomeMsg);
        
        setTimeout(() => {
            welcomeMsg.style.animation = "slideOut 0.5s ease-out";
            setTimeout(() => welcomeMsg.remove(), 500);
        }, 4000);
        
        localStorage.setItem("visited", "true");
    }, 1000);
}
