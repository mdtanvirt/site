const unprotected_routes = ["/login.html", "/signup.html"];
const api_url = "https://http-nodejs-production-0d97.up.railway.app:5050";
const checkLogin = (() => {
  const path = window.location.pathname;
  const user = localStorage.getItem("user");
  if (!unprotected_routes.includes(path)) {
    if (!user) {
      window.location.replace("login.html");
    }
  } else {
    if (user) {
      window.location.replace("/");
    }
  }
})();

const login = () => {
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;
  axios
    .post(`${api_url}/users/login`, {
      email: email,
      password: password,
    })
    .then((r) => {
      localStorage.setItem("user", JSON.stringify(r?.data?.user));
      window.location.replace("/");
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.replace("login.html");
};
const signup = () => {
  const name = document.getElementById("signup_name").value;
  const email = document.getElementById("signup_email").value;
  const password = document.getElementById("signup_password").value;
  const confirm_password = document.getElementById(
    "signup_confirm_password"
  ).value;
  axios
    .post(`${api_url}/users/signup`, {
      email: email,
      password: password,
      confirmPassword: confirm_password,
      name: name,
    })
    .then((r) => {
      window.location.replace("/login.html");
    });
};
