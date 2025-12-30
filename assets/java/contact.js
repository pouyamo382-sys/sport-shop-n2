document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});

function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const count = localStorage.getItem('cartCount') || '0';
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}
/* ===============================
   CONTACT PAGE JS
================================ */

/* FAB - Go To Top */
const fab = document.querySelector(".fab-go-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    fab.style.display = "flex";
  } else {
    fab.style.display = "none";
  }
});

fab.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* Simple Form Submit (Demo) */
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("پیام شما با موفقیت ارسال شد ✔");

  form.reset();
});
