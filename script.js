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

    products.forEach((product) => {

        const productName =
            product.dataset.name.toLowerCase();

        const productCategory =
            product.dataset.category.toLowerCase();

        const matchesSearch =
            productName.includes(searchValue);

        let matchesFilter = true;

        if (selectedFilters.length > 0) {

            matchesFilter =
                selectedFilters.includes(
                    productCategory
                );
        }

        if (matchesSearch && matchesFilter) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }
    });
}

// ===============================
// SEARCH EVENT
// ===============================

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        filterProducts
    );
}

// ===============================
// FILTER EVENT
// ===============================

checkboxes.forEach((checkbox) => {

    checkbox.addEventListener(
        "change",
        filterProducts
    );
});

// ===============================
// NEWSLETTER SUBSCRIBE
// ===============================

const subscribeButtons =
    document.querySelectorAll("button");

subscribeButtons.forEach((button) => {

    if (
        button.textContent
            .trim()
            .toLowerCase()
            .includes("subscribe")
    ) {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Thank you for subscribing to Nostra!"
                );

            }
        );
    }
});

// ===============================
// CONTACT FORM
// ===============================

const contactForm =
    document.querySelector("form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            alert(
                "Your message has been sent successfully!"
            );

            contactForm.reset();
        }
    );
}
