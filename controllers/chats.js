const Chat = require("../models/chat");
const User = require("../models/user");

module.exports = {
  allChatsIndex,
  createChat
};

async function createChat(req, res) {
  const users = req.body;
  const firstUser = await User.findOne({ _id: users[0][0]._id }).populate(
    "chats"
  );
  const secondUser = await User.findOne({ _id: users[1]._id }).populate(
    "chats"
  );
  let chat;
  firstUser.chats.map(ch1 => {
    secondUser.chats.map(ch2 => {
      if (JSON.stringify(ch1._id) === JSON.stringify(ch2._id)) {
        chat = ch1;
        console.log("they are equal");
        res.json(chat);
      }
      if (chat) return;
    });
    if (chat) return;
  });
  if (!chat) {
    chat = new Chat();
    firstUser.chats.push(chat._id);
    secondUser.chats.push(chat._id);
    chat.users.push(firstUser._id, secondUser._id);
    await firstUser.save();
    await secondUser.save();
    await chat.save();
    res.json(chat);
  }
}

function allChatsIndex(req, res) {
  console.log("Meisam is in the server now just for a freaking chat");
}
