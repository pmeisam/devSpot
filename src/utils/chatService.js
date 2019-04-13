import tokenService from "./tokenService";
// import userService from "./userService";
const BASE_URL = "/api/chats/";

export default {
  createChat
};

function createChat([...users]) {
  
  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken()
    }),
    body: JSON.stringify(users)
  };
  return fetch(BASE_URL + 'createChat', options).then(res => res.json());
}
