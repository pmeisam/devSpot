const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: String,
  content: String,
},{
  timestamps: true
});

const chatSchema = new Schema(
  {
    messages: [messageSchema],
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


module.exports = mongoose.model("Chat", chatSchema);
