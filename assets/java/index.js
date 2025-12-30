document.addEventListener('DOMContentLoaded', () => {
  updateBadge();
});

function updateBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const count = localStorage.getItem('cartCount') || '0';
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none'; // اگر 0 باشد، مخفی شود
  }
}
