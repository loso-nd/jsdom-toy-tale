let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

/**
 * Part 2 -
 * Fetch the toys from the db and append toys on to the dom 
 */

    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => {
      toys.forEach(toy => {createToys(toy)})
    })
  
  
  function createToys(toy) {
    let container = document.getElementById('toy-collection')
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const pTxt = document.createElement('p')
    const btn = document.createElement('button')

  //Assigns props from the json Obj to elements on the page
    div.className = "card"
    h2.textContent = toy.name
    img.src = toy.image
    img.className ="toy-avatar"
    pTxt.textContent = toy.likes
    btn.className = "like-btn"
    btn.textContent = "Like <3"
    div.append(h2, img, pTxt, btn)
    container.appendChild(div)

    btn.addEventListener('click', (e) => {
      updatedLikes(pTxt, toy) 
    })
  }

  /** End Part 2 - */


  /**
 * Part 3 -
 * POST a new toy to the server and then render that new toy to 
 * the DOM
 * 
 * 1st grab the form and add an e.listener to the submit button
 * Upon submitting a new toy the POST request should send back a request followed 
 * by a response then render the image on the server and the dom
 */

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
// e is the event bc we want to target the values from the input form 

fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:  JSON.stringify({
    name: e.target.name.value,
    image: e.target.image.value,
    like: 100
  })
})
.then(r => r.json())
.then(newToy => buildToy(newToy))

})

function updatedLikes(pTxt, toy){
  let newVal = parseInt(pTxt.textContent) + 1

  fetch (`http://localhost:3000/toys/${toy.id}`,{ //all fetch obj needs a 2nd param
  method: "PATCH",
  headers:
    { 
      "Content-Type" : "application/json",
        Accepts : "application/json"
    },
    body: JSON.stringify( {
      likes : newVal // we set newVal bc this is what we are updating
    })
  })
.then(resp => resp.json())
.then(likes => pTxt.textContent = likes.likes) 

}



});
