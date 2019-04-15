const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  getAllUsers,
  getNotifications,
  updateProfile,
  getUserFromServer
};
async function getUserFromServer(req, res) {
  User.findById({ _id: req.user._id }, async function(err, user) {
    await res.json(user);
  });
}

async function updateProfile(req, res) {
  User.findOne({ _id: req.user._id }, async function(err, user) {
    if (req.body.portfolio) user.portfolio = req.body.portfolio;
    if (req.body.linkedIn) user.linkedIn = req.body.linkedIn;
    if (req.body.gitHub) user.gitHub = req.body.gitHub;
    if (req.body.bio) user.bio = req.body.bio;
    await user.save();
  });
}

async function getNotifications(req, res) {
  User.findById({ _id: req.user._id }, async function(err, user) {
    await res.json(user.notifications);
  });
}

async function getAllUsers(req, res) {
  // var modelQuery = req.body.user ? {userName: new RegExp(req.body.username, 'i')} : {};
  // let sortKey = req.query.sort || 'userName';
  const users = await User.find({})
    .populate("projects")
    .populate("chats");
  res.json(users);
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
