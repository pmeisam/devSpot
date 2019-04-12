const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const chatSchema = new Schema(
  {
    message: String,
    file: String,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

chatSchema.statics.findChatOrCreateOne = async function(users) {
  const firstUser = await User.findOne({ _id: users[0] }).populate("chats");
  const secondUser = await User.findOne({ _id: users[1] }).populate("chats");
  if (firstUser.chats.length) {
    firstUser.chats.forEach(c => {
      secondUser.chats.forEach((ch, i) => {
        if (JSON.stringify(c) === JSON.stringify(ch)) {
          console.log("inside loop");
          console.log(Promise.resolve(c));
          return Promise.resolve(c);
        }
      });
    });
  } else {
    console.log("inside else now");
    const chat = new this();
    firstUser.chats.push(chat._id);
    secondUser.chats.push(chat._id);
    chat.users.push(firstUser._id, secondUser._id);
    await firstUser.save();
    await secondUser.save();
    await chat.save();
    console.log(Promise.resolve(chat));
  }
};
module.exports = mongoose.model("Chat", chatSchema);
