import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(user)
    })
      .then(res => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  // The above could have been written as
  //.then((token) => token.token);
}

function getAllUsers() {
  const options = {
    method: "GET",
    headers: { Authorization: "Bearer " + tokenService.getToken() }
  };
  return fetch(BASE_URL + "users", options).then(res => res.json());
}

function getUser() {
  
  return tokenService.getUserFromToken();
}

function getUserFromServer() {
  const options = {
    method: "GET",
    headers: { Authorization: "Bearer " + tokenService.getToken() }
  };
  return fetch(BASE_URL + "user", options).then(res => res.json());
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds)
  })
    .then(res => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function getNotifications() {
  return fetch(BASE_URL + "notifications", {
    method: "GET",
    headers: { Authorization: "Bearer " + tokenService.getToken() }
  }).then(res => res.json());
}

function updateProfile(user) {
  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken()
    }),
    body: JSON.stringify(user)
  };
  return fetch(BASE_URL + "updateprofile", options).then(res => res.json());
}

export default {
  signup,
  getUser,
  logout,
  login,
  getAllUsers,
  getNotifications,
  updateProfile,
  getUserFromServer,
};
