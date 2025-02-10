document.addEventListener("DOMContentLoaded", function() {
    // Get the updated cart total from localStorage
    let cartTotal = localStorage.getItem("cartTotal") || "0.00";
    document.getElementById("total-amount").textContent = `$${cartTotal}`;

    document.getElementById("confirm-order").addEventListener("click", function() {
        let name = document.getElementById("name").value.trim();
        let address = document.getElementById("address").value.trim();
        let mobile = document.getElementById("mobile").value.trim();
        let paymentMethod = document.getElementById("payment-method").value;

        if (!name || !address || !mobile) {
            alert("Please fill in all details.");
            return;
        }

        let orderDetails = {
            name,
            address,
            mobile,
            totalAmount: cartTotal,
            paymentMethod
        };

        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
        alert("Order placed successfully!");
        window.location.href = "order-confirmation.html";
    });
});
