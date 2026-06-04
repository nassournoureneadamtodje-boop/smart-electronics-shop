const API_URL = "/api";
let allProducts = [];

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.innerText = count;
  }
}

function addToCart(id, name, price) {
  let cart = getCart();
  let item = cart.find(p => p.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert("Product added to cart!");
}

async function loadProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();

  allProducts = products;
  displayProducts(products);
}

function displayProducts(products) {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p><strong>Category:</strong> ${product.category}</p>
      <p>${product.description}</p>
      <p class="stock">Available in Stock</p>
      <p class="price">${product.price} RWF</p>
      <button class="btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
        Add to Cart
      </button>
    </div>
  `).join("");
}

function filterProducts() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filteredProducts = allProducts.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(search);
    const matchCategory = category === "All" || product.category === category;
    return matchSearch && matchCategory;
  });

  displayProducts(filteredProducts);
}

function loadCart() {
  const cartTable = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-total");

  if (!cartTable) return;

  const cart = getCart();
  let total = 0;

  if (cart.length === 0) {
    cartTable.innerHTML = `
      <tr>
        <td colspan="5">Your cart is empty.</td>
      </tr>
    `;
    totalBox.innerText = "0 RWF";
    return;
  }

  cartTable.innerHTML = cart.map((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    return `
      <tr>
        <td>${item.name}</td>
        <td>${item.price} RWF</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        </td>
        <td>${subtotal} RWF</td>
        <td><button class="btn" onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
  }).join("");

  totalBox.innerText = total + " RWF";
}

function updateQuantity(index, quantity) {
  let cart = getCart();
  cart[index].quantity = Number(quantity);
  saveCart(cart);
  loadCart();
  updateCartCount();
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
  updateCartCount();
}

function loadCheckoutSummary() {
  const summary = document.getElementById("order-summary");
  const totalBox = document.getElementById("checkout-total");

  if (!summary) return;

  const cart = getCart();
  let total = 0;

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    totalBox.innerText = "0 RWF";
    return;
  }

  summary.innerHTML = cart.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    return `<p>${item.name} x ${item.quantity} = ${subtotal} RWF</p>`;
  }).join("");

  totalBox.innerText = total + " RWF";
}

async function checkout(event) {
  event.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = {
    customer_name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    items: cart,
    total: total
  };

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  const result = await response.json();

  if (response.ok) {
    localStorage.removeItem("cart");
    localStorage.setItem("orderId", result.orderId);
    window.location.href = "confirmation.html";
  } else {
    alert(result.error);
  }
}

function showOrderId() {
  const orderIdBox = document.getElementById("order-id");
  if (!orderIdBox) return;

  const orderId = localStorage.getItem("orderId") || "N/A";
  orderIdBox.innerText = orderId;
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCart();
  loadCheckoutSummary();
  showOrderId();
  updateCartCount();

  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", checkout);
  }
});