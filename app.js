const API_URL = "http://localhost:5000/api";

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
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
  alert("Product added to cart!");
}

async function loadProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();

  productList.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p>${product.description}</p>
      <p class="price">${product.price} RWF</p>
      <button class="btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
        Add to Cart
      </button>
    </div>
  `).join("");
}

function loadCart() {
  const cartTable = document.getElementById("cart-items");
  const totalBox = document.getElementById("cart-total");
  if (!cartTable) return;

  const cart = getCart();
  let total = 0;

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
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
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
    headers: { "Content-Type": "application/json" },
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

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCart();

  const form = document.getElementById("checkout-form");
  if (form) form.addEventListener("submit", checkout);
});