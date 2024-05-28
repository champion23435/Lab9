document.addEventListener("DOMContentLoaded", () => {
    const dogListContainer = document.getElementById("dog-list");
    const modal = document.getElementById("dog-modal");
    const modalContent = {
        image: document.getElementById("dog-modal-image"),
        title: document.getElementById("dog-modal-title"),
        sex: document.getElementById("dog-modal-sex"),
        age: document.getElementById("dog-modal-age"),
        description: document.getElementById("dog-modal-description")
    };
    const closeButton = document.querySelector(".close");

    fetch("https://usersdogs.dmytrominochkin.cloud/dogs")
        .then(response => response.json())
        .then(dogs => {
            dogs.forEach(dog => {
                const dogItem = document.createElement("div");
                dogItem.classList.add("dog-item");
                dogItem.innerHTML = `
                    <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                    <h3>${dog.title}</h3>
                    <p>${dog.sex === 'MALE' ? 'Male' : 'Female'}</p>
                `;
                dogItem.addEventListener("click", () => {
                    showModal(dog);
                });
                dogListContainer.appendChild(dogItem);
            });
        })
        .catch(error => console.error("Error fetching dog data:", error));

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function showModal(dog) {
        modalContent.image.src = `https://usersdogs.dmytrominochkin.cloud${dog.dogImage}`;
        modalContent.title.textContent = dog.title;
        modalContent.sex.textContent = `Sex: ${dog.sex === 'MALE' ? 'Male' : 'Female'}`;
        modalContent.age.textContent = `Age: ${dog.age}`;
        modalContent.description.textContent = dog.description;
        modal.style.display = "block";
    }
});
