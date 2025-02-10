document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartTotal() {
        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        document.getElementById("subtotal").textContent = `₹${total.toFixed(2)}`;
        document.getElementById("tax").textContent = `₹${(total * 0.05).toFixed(2)}`;
        document.getElementById("total").textContent = `₹${(total * 1.05).toFixed(2)}`;

        localStorage.setItem("cartTotal", (total * 1.05).toFixed(2)); // Save total with tax
    }

    function updateCartDisplay() {
        let cartItemsContainer = document.getElementById("cart-items");
        if (!cartItemsContainer) return; // Prevent errors if cart page isn't loaded

        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No products in cart</td></tr>`;
            document.getElementById("subtotal").textContent = `₹0.00`;
            document.getElementById("tax").textContent = `₹0.00`;
            document.getElementById("total").textContent = `₹0.00`;
            localStorage.setItem("cart", JSON.stringify(cart)); // Save empty cart
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="item-quantity" data-index="${index}" value="${item.quantity}" min="1">
                </td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-item btn btn-danger btn-sm" data-index="${index}">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
            subtotal += item.price * item.quantity;
        });

        let tax = subtotal * 0.05; // 5% tax
        let total = subtotal + tax;
        document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
        document.getElementById("total").textContent = `₹${total.toFixed(2)}`;

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartTotal", total.toFixed(2)); // Save updated total
    }

    // Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price"));

            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartTotal();
            updateCartDisplay(); // Update UI after adding item
        });
    });

    // Update Quantity
    document.getElementById("cart-items")?.addEventListener("input", function (event) {
        if (event.target.classList.contains("item-quantity")) {
            let index = event.target.getAttribute("data-index");
            let newQuantity = parseInt(event.target.value);

            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
            } else {
                cart[index].quantity = 1; // Prevent invalid zero values
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // Remove Item from Cart
    document.getElementById("cart-items")?.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart)); // Save changes
            updateCartDisplay();
        }
    });

    // Save Total for Checkout
    document.getElementById("checkout-btn")?.addEventListener("click", function () {
        let totalAmount = document.getElementById("total").textContent;
        localStorage.setItem("totalAmount", totalAmount);
        alert("Total saved for checkout: " + totalAmount);
    });

    updateCartDisplay(); // Ensure the cart is updated on page load
});
