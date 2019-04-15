const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    user_name: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    avatar: String,
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project"
      }
    ],
    gitHub: String,
    linkedIn: String,
    portfolio: String,
    bio: String,
    notifications: [{user_name: String, user_id: String, notification: String}],
    followers: [String],
    following: [String],
    chats: [{
      type: Schema.Types.ObjectId,
      ref: "Chat"
    }],
  },
  {
    timestamps: true
  }
);

userSchema.set("toJSON", {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

userSchema.pre("save", function(next) {
  // 'this' will be set to the current document
  const user = this;
  if (!user.isModified("password")) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
