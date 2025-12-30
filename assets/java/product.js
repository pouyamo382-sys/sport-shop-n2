document.addEventListener('DOMContentLoaded', () => {
  updateBadge();

  // مدیریت کلیک روی دکمه‌های افزودن به سبد
  document.querySelectorAll('.md-btn.md-filled.md-small').forEach(btn => {
    btn.addEventListener('click', () => {
      let count = parseInt(localStorage.getItem('cartCount') || '0');
      count++;
      localStorage.setItem('cartCount', count);
      updateBadge();
    });
  });
});

function updateBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const count = localStorage.getItem('cartCount') || '0';
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none'; // اگر 0 باشد، مخفی شود
  }
}