document.addEventListener("DOMContentLoaded", () => {


  updateBadge();

  document.querySelectorAll(".md-btn.md-filled.md-small").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      let count = parseInt(localStorage.getItem("cartCount") || "0");
      count++;
      localStorage.setItem("cartCount", count);
      updateBadge();
    });
  });

  function updateBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const count = localStorage.getItem("cartCount") || "0";
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }


  document.querySelectorAll(".favorite-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      btn.classList.toggle("active");
      btn.textContent = btn.classList.contains("active")
        ? "favorite"
        : "favorite_border";
    });
  });

  document.querySelectorAll(".star-rating").forEach(rating => {
    const stars = rating.querySelectorAll(".star");
    stars.forEach(star => {
      star.addEventListener("click", e => {
        e.stopPropagation();
        const value = parseInt(star.dataset.value);
        stars.forEach(s => {
          if (parseInt(s.dataset.value) <= value) {
            s.textContent = "star";
            s.classList.add("active");
          } else {
            s.textContent = "star_border";
            s.classList.remove("active");
          }
        });
      });
    });
  });

  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");
  const products = Array.from(document.querySelectorAll(".product-grid .product-card"));

  function getCategory(card) {
    const title = card.querySelector("h3").innerText;
    if (title.includes("کفش")) return "shoes";
    if (title.includes("لباس")) return "clothes";
    if (title.includes("دمبل") || title.includes("کش") || title.includes("مت"))
      return "equipment";
    return "accessory";
  }

  function getPrice(card) {
    return parseInt(
      card.querySelector(".price").innerText.replace(/[^0-9]/g, "")
    );
  }

  function filterProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    products.forEach(card => {
      const text = card.innerText.toLowerCase();
      const matchesSearch = text.includes(search);
      const matchesCategory =
        category === "all" || getCategory(card) === category;

      card.style.display = matchesSearch && matchesCategory ? "block" : "none";
    });
  }

  function sortProducts() {
    const container = document.querySelector(".grid-container");
    const sorted = [...products];

    switch (sortFilter.value) {
      case "price-asc":
        sorted.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "name-asc":
        sorted.sort((a, b) =>
          a.querySelector("h3").innerText.localeCompare(
            b.querySelector("h3").innerText
          )
        );
        break;
      case "name-desc":
        sorted.sort((a, b) =>
          b.querySelector("h3").innerText.localeCompare(
            a.querySelector("h3").innerText
          )
        );
        break;
    }

    sorted.forEach(card => container.appendChild(card));
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  sortFilter.addEventListener("change", sortProducts);


  const detailSection = document.getElementById("product-detail");
  const gridSection = document.querySelector(".product-grid");
  const specialSection = document.querySelector(".special-products");
  const controlsSection = document.querySelector(".product-controls");

  const detailTitle = document.getElementById("detail-title");
  const detailDesc = document.getElementById("detail-desc");
  const detailPrice = document.getElementById("detail-price");
  const detailImg = document.getElementById("detail-main-img");
  const detailRating = document.getElementById("detail-rating");

  products.forEach(card => {
    card.addEventListener("click", () => {
      detailTitle.innerText = card.querySelector("h3").innerText;
      detailDesc.innerText = card.querySelector("p").innerText;
      detailPrice.innerText = card.querySelector(".price").innerText;
      detailImg.src = card.querySelector("img").src;

      detailRating.innerHTML = card.querySelector(".star-rating").innerHTML;

      gridSection.style.display = "none";
      specialSection.style.display = "none";
      controlsSection.style.display = "none";
      detailSection.style.display = "block";
      window.scrollTo(0, 0);
    });
  });

  document.querySelector(".back-btn").addEventListener("click", () => {
    detailSection.style.display = "none";
    gridSection.style.display = "block";
    specialSection.style.display = "block";
    controlsSection.style.display = "flex";
  });

});
