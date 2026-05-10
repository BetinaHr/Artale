const cartCount = document.getElementById("cartCount");
const cartItems = JSON.parse(localStorage.getItem("artaleCart")) || [];

if (cartCount) {
    cartCount.textContent = cartItems.length;
}