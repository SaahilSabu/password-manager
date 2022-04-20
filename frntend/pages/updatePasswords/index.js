const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

console.log(noteId);

const updatePasswordButton = document.querySelector(".create-password-button");

const apiUrl = "http://localhost:5000";

updatePasswordButton.addEventListener("click", () => {
  const userName = document.querySelector(".create-password-input");
  const userDomain = document.querySelector(".create-password-heading");
  const userPassword = document.querySelector(".create-password-password");

  const username = userName.value;
  const domain = userDomain.value;
  const password = userPassword.value;

  fetch(`${apiUrl}/api/password/update/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, domain, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        location.href = "../dashboard/dashboard.html";
      }
    })
    .catch((err) => {
      alert("Error Creating Note!! Re-try....");
      console.log(err);
    });
});
