const cardContainer = document.querySelector(".card-container");
const logout = document.querySelector(".logout");
const createNoteButton = document.querySelector(".new-note");

const apiUrl = "http://localhost:5000";

// const token = localStorage.getItem("jwt");

logout.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "/";
});

let cardData = [];

createNoteButton.addEventListener("click", () => {
  location.href = "../createNotes/createNotes.html";
  // location.href = "/pages/createPassword/createPasswords.html";
});

const createNotes = (array) => {
  cardContainer.innerHTML = "";

  array.forEach((cardObj) => {
    const { domain, username, password } = cardObj;
    const id = cardObj.noteId;

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;

    const insideHtml = `<div class="card-header"><div class="card-heading">${domain}</div><a href="../updateNotes/updateNotes.html?noteId=${id}"><div class="edit-note"><img src="../../assets/edit-note.svg" alt="" /></div></a></div><div class="username-content">${username}</div><div class="password-content">${password}</div>`;

    card.innerHTML = insideHtml;

    cardContainer.appendChild(card);
  });
};

const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");

  // if (token) {
  fetch(`${apiUrl}/api/password/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json(), console.log(res);
    })
    .then((data) => {
      cardData = data.data;
      createNotes(data.data);
    })
    .catch((err) => {
      alert("Error Fetching data");
      console.log(err);
    });
  // }
});
