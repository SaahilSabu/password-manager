const body = document.querySelector("body");

const apiUrl = "http://localhost:5000"; // to be filled

window.addEventListener("load", () => {
  body.classList.add("visible");
});

const signInForm = document.querySelector(".signin-form");

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  location.href = "../dashboard/dashboard.html";
  const signInUsername = document.querySelector(".signin-username");
  const signInEmail = document.querySelector(".signin-email");
  const signInPassword = document.querySelector(".signin-password");

  const email = signInEmail.value;
  const masterPassword = signInPassword.value;
  const username = signInUsername.value;

  fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, masterPassword }),
  })
    .then((res) => {
      res.json(), (location.href = "../dashboard/dashboard.html");
    })
    // .then((data) => {
    //   const { token } = data;

    //   if (token) {
    //     localStorage.setItem("jwt", token);
    //   } else {
    //     alert("SignIn Again");
    //   }
    // })
    .catch((err) => {
      alert("Error Signing In!!! Re-try....");
      console.log(err);
    });
});

const signUpForm = document.querySelector(".signup-form");

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector(".signup-email").value;
  const username = document.querySelector(".signup-username").value;
  // const name = document.querySelector(".signup-name").value;
  const masterPassword = document.querySelector(".signup-password").value;
  const retypedPassword = document.querySelector(
    ".signup-retyped-password"
  ).value;

  if (masterPassword !== retypedPassword) {
    alert("Passwords don't match");
    return;
  }

  fetch(`${apiUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, masterPassword }),
  })
    .then((res) => {
      res.json(), (location.href = "./pages/dashboard/dashboard.html");
    })
    // .then((data) => {
    //   const { token } = data;

    //   if (token) {
    //     localStorage.setItem("jwt", token);
    //   } else {
    //     alert("SignUp Again");
    //   }
    // })
    .catch((err) => {
      alert("Error Signing Up!!! Re-try....");
      console.log(err);
    });
});
