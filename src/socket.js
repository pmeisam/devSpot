import tokenService from "./utils/tokenService";
const socket = window.io();
let ChatPage = null;

console.log(socket);

function registerApp(app) {
  ChatPage = app;
}
function getActive() {
  socket.emit("get-active", tokenService.getToken());
}
function logout() {
  socket.emit("logout", tokenService.getToken());
}

export default {
  registerApp,
  logout,
  getActive
};
