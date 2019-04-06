import tokenService from "./tokenService";
import userService from "./userService";
const BASE_URL = "/api/projects/";

export default {
  create_post,
  index,
  userIndex
};

function create_post(project) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(project)
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("Bad Cridentials");
  });
}

function index() {
  if (userService.getUser()) {
    return fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: "Bearer" + tokenService.getToken() }
    }).then(res => res.json());
  }
}

function userIndex() {
  if (userService.getUser()) {
    const user = userService.getUser();
    return fetch(BASE_URL + `${user.user_name}`, {
      method: "GET",
      headers: { Authorization: "Bearer" + tokenService.getToken() }
    }).then(res => res.json());
  }
}
