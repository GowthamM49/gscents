document.addEventListener("DOMContentLoaded", function () {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    function displayReviews() {
        let reviewsList = document.getElementById("reviews-list");
        reviewsList.innerHTML = ""; // Clear previous content

        reviews.forEach(review => {
            let reviewCard = document.createElement("div");
            reviewCard.classList.add("card", "p-3", "mb-3");
            reviewCard.innerHTML = `
                <h5>${review.name}</h5>
                <p>${review.text}</p>
                <small class="text-muted">${review.date}</small>
            `;
            reviewsList.appendChild(reviewCard);
        });
    }

    document.getElementById("submit-review").addEventListener("click", function () {
        let name = document.getElementById("review-name").value.trim();
        let text = document.getElementById("review-text").value.trim();
        
        if (name === "" || text === "") {
            alert("Please enter both your name and review.");
            return;
        }

        let newReview = {
            name: name,
            text: text,
            date: new Date().toLocaleString()
        };

        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        displayReviews();

        document.getElementById("review-name").value = "";
        document.getElementById("review-text").value = "";
    });

    displayReviews();
});
