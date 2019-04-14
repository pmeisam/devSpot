const jwt = require("jsonwebtoken");
const Chat = require("./models/chat");
let io;


module.exports = {
  init,
  getIo
};

function init(http) {
  io = require("socket.io")(http);
  io.on("connection", function(socket) {
    console.log("connected to socket.io");

    socket.on("new-message", async function({ content, id, token }) {
      const chat = await Chat.findById(id).populate("users");
      const user = await validateToken(token);
      if (!user) return;
      const authorized = chat.users.map(u => u.id).includes(user._id);
      if (authorized) {
        chat.messages.push({
          content: content,
          user: user._id,
          userName: user.user_name
        });
        await chat.save();
        socket.join(chat._id, function() {
          io.to(chat._id).emit("new-message", chat);
        });
      } else {
        socket.join(`unauthorized-user`, function() {
          io.to(`unauthorized-user`).emit("unauthorized-user");
        });
      }
    });

    socket.on('page-clicked', async function({ id, token }){
      console.log(id)
      const chat = await Chat.findById(id).populate("users");
      const user = await validateToken(token);
      if (!user) return;
      socket.join(chat._id, function() {
        io.to(chat._id).emit("page-clicked", chat);
      });
    })

  });
}

function getIo() {
  return io;
}
function findMessages() {
  Chat.findById
}

function validateToken(token) {
  return new Promise(function(resolve) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) resolve(false);
      resolve(decoded.user);
    });
  });
}
