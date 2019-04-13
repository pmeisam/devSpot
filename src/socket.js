import tokenService from "./utils/tokenService";
const socket = window.io();
let ChatPage = null;


function registerApp(app) {
  ChatPage = app;
}
function getActive() {
  socket.emit("get-active", tokenService.getToken());
}
function logout() {
  socket.emit("logout", tokenService.getToken());
}

function sendMessage({content, id}) {
  const token = tokenService.getToken();
  socket.emit('new-message', {content, id, token})
}



socket.on('update-messages', function(chat){
  ChatPage.setState({messages: chat.messages})
})

export default {
  registerApp,
  logout,
  getActive,
  sendMessage
};
