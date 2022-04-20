const createPasswordButton = document.querySelector(".create-password-button");

const apiUrl = "http://localhost:5000";

// const token = localStorage.getItem("jwt");

createPasswordButton.addEventListener("click", () => {
  const userName = document.querySelector(".create-password-input");
  const userDomain = document.querySelector(".create-password-heading");
  const userPassword = document.querySelector(".create-password-password");

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
      location.href = "../dashboard/dashboard.html"
    })
    // .then((data) => {
    //   if (data.message) {
    //   }
    // })
    .catch((err) => {
      alert("Error Creating password!! Re-try....");
      console.log(err);
    });
  // }
});
