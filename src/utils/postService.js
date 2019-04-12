import tokenService from "./tokenService";
import userService from "./userService";
const BASE_URL = "/api/projects/";

export default {
  create_post,
  index,
  userIndex,
  addLike,
  addComment,
  removeComment,
  deleteProject,
  updateProject
};

function create_post(project) {
  return fetch(BASE_URL + "create-post", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken()
    }),
    body: JSON.stringify(project)
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error("Bad Cridentials");
  });
}

function index() {
  if (userService.getUser()) {
    const options = {
      method: "GET",
      headers: { Authorization: "Bearer " + tokenService.getToken() }
    };
    return fetch(BASE_URL, options).then(res => res.json());
  }
}

function userIndex() {
  if (userService.getUser()) {
    const username = userService.getUser();
    return fetch(BASE_URL + username.user_name, {
      method: "GET",
      headers: { Authorization: "Bearer " + tokenService.getToken() }
    }).then(res => res.json());
  }
}

function addLike(projectId) {
  const options = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(projectId)
  };
  return fetch(BASE_URL + "likebtn", options).then(res => res.json());
}

function addComment(projectId) {
  const options = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(projectId)
  };
  return fetch(BASE_URL + "createcomment", options).then(res => res.json());
}

function removeComment(project) {
  const options = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(project)
  };
  return fetch(BASE_URL + "deletecomment", options).then(res => res.json());
}

function deleteProject(project) {
  const options = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(project)
  };
  return fetch(BASE_URL + "deleteproject", options).then(res => res.json());
}

function updateProject(project) {
  const options = {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(project)
  };
  return fetch(BASE_URL + "updateproject", options).then(res => res.json);
}
