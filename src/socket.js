import tokenService from "./utils/tokenService";
const socket = window.io();
let ChatPage = null;
let UserProfilePage = null;

function registerApp(app) {
  ChatPage = app;
}

function registerUserProfilePage(app) {
  UserProfilePage = app;
}



function sendMessage({content, id}) {
  const token = tokenService.getToken();
  socket.emit('new-message', {content, id, token})
}

function pageClicked(id) {
  const token = tokenService.getToken();
  socket.emit('page-clicked', {id, token})
}

socket.on('page-clicked', function(chat){
  UserProfilePage.setState({messages: chat.messages})
})

socket.on('new-message', function(chat){
  ChatPage.setState({messages: chat.messages})
})

export default {
  registerApp,
  sendMessage,
  pageClicked,
  registerUserProfilePage
};
