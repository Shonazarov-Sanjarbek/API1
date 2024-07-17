const wrapper = document.querySelector(".post__wrapper")

const API_URL = "https://jsonplaceholder.typicode.com"


async function fetchPosts(api) {
   let response = await fetch(`${api}/posts`)
   
    response
        .json()
        .then((res)=> createCard(res))
        .catch((err)=> console.log(err))
}

fetchPosts(API_URL)

function createCard(data) {
    data.forEach((post) => {
        console.log(post);
        let card = document.createElement("div")
        card.classList.add("post__card")
        card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        `
  
        wrapper.appendChild(card)
    })
}