const createNoteButton = document.querySelector(".create-note-button");

const apiUrl = "http://localhost:5000";

// const token = localStorage.getItem("jwt");

createNoteButton.addEventListener("click", () => {
  const userName = document.querySelector(".create-note-input");
  const userDomain = document.querySelector(".create-note-heading");
  const userPassword = document.querySelector(".create-note-password");

  const username = userName.value;
  const domain = userDomain.value;
  const password = userPassword.value;

  // if (token) {
  fetch(`${apiUrl}/api/password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // authorization: token,
    },
    body: JSON.stringify({ domain, username, password }),
  })
    .then((res) => {
      res.json(),
      location.href = "/pages/dashboard/dashboard.html"
    })
    // .then((data) => {
    //   if (data.message) {
    //   }
    // })
    .catch((err) => {
      alert("Error Creating Note!! Re-try....");
      console.log(err);
    });
  // }
});
