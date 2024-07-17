const API__USERS = "https://jsonplaceholder.typicode.com"

const rightBtn = document.querySelector(".right")
const leftBtn = document.querySelector(".left")
const loading = document.querySelector(".loading")
const modal = document.getElementById("myModal")
const closeModal = document.querySelector(".close")
const modalBody = document.getElementById("modal-body")
const wrapper = document.querySelector(".carousel__wrapper")

let usersData = [];
const itemsPerPage = 3;
let currentPage = 1;

window.onload = function() {
    fetchUsers(API__USERS);
};

closeModal.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
function setupCarousel() {
    let maxPages = Math.ceil(usersData.length / itemsPerPage);

    leftBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            createCard();
        }
    };

    rightBtn.onclick = () => {
        if (currentPage < maxPages) {
            currentPage++;
            createCard();
        }
    };
}

async function fetchUsers(api) {
    try {
        loading.style.display = "block"
        let response = await fetch(`${api}/users`)
        response
            .json()
            .then((res) => createUsers(res))
            .catch()
            
    } catch (error) {
      console.log(error);  
    } finally {
        loading.style.display = "none"
    }
}

function createUsers(data) {
    wrapper.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = usersData.slice(startIndex, endIndex);

    data.forEach((user) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img src="./assets/img/man.png" alt="">
        <h3>${user.name}</h3>
        <p>${user.company.catchPhrase}</p>
        <button onclick="showModal(${user.id})">View More</button>
        `;
        console.log(card);
        
        wrapper.appendChild(card);
        
    }
);
    setupCarousel();
}

function showModal(id) {
    fetch(`${API__USERS}/users/${id}`)
        .then(response => response.json())
        .then(data => {
            modalBody.innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Username:</strong> ${data.username}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Address:</strong> ${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Website:</strong> ${data.website}</p>
                <p><strong>Company:</strong> ${data.company.name}</p>
                <p><strong>Catch Phrase:</strong> ${data.company.catchPhrase}</p>
            `;
            modal.style.display = "flex";
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
}

function setupCarousel() {
    let maxPages = Math.ceil(usersData.length / itemsPerPage);

    leftBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            createUsers();
        }
    };

    rightBtn.onclick = () => {
        if (currentPage < maxPages) {
            currentPage++;
            createUsers();
        }
    };
}