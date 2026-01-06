document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
});


function renderCart() {
  const container = document.querySelector(".cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>سبد خرید شما خالی است.</p>";
    updateInvoice([]);
    return;
  }

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item md-card md-card-elevated">
        <img src="${item.image}">
        <div class="item-details">
          <h3>${item.title}</h3>
          <p class="price">${item.price.toLocaleString()} تومان</p>

          <div class="item-quantity">
            <label>تعداد:</label>
            <input type="number" min="1" value="${item.qty}" data-index="${index}">
          </div>

          <button class="md-btn md-outlined md-small btn-remove" data-index="${index}">
            حذف
          </button>
        </div>
      </div>
    `;
  });

  bindCartEvents();
  updateInvoice(cart);
}


function bindCartEvents() {
  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart();
      updateCartBadge();
    });
  });

  document.querySelectorAll(".item-quantity input").forEach(input => {
    input.addEventListener("change", () => {
      const index = input.dataset.index;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let value = parseInt(input.value);
      if (value < 1) value = 1;

      cart[index].qty = value;
      localStorage.setItem("cart", JSON.stringify(cart));

      updateInvoice(cart);
      updateCartBadge();
    });
  });
}


function updateInvoice(cart) {
  const table = document.querySelector(".invoice-preview table");
  const totalEl = document.querySelector(".invoice-preview p strong");

  let total = 0;

  table.innerHTML = `
    <tr>
      <th>محصول</th>
      <th>تعداد</th>
      <th>قیمت</th>
    </tr>
  `;

  cart.forEach(item => {
    const sum = item.price * item.qty;
    total += sum;

    table.innerHTML += `
      <tr>
        <td>${item.title}</td>
        <td>${item.qty}</td>
        <td>${sum.toLocaleString()} تومان</td>
      </tr>
    `;
  });

  totalEl.innerText = total.toLocaleString() + " تومان";
}


function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}
