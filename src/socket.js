import tokenService from "./utils/tokenService";
const socket = window.io();
let ChatPage = null;


function registerApp(app) {
  ChatPage = app;
}



function sendMessage({content, id}) {
  const token = tokenService.getToken();
  socket.emit('new-message', {content, id, token})
}



socket.on('new-message', function(chat){
  ChatPage.setState({messages: chat.messages})
})

export default {
  registerApp,
  sendMessage
};
