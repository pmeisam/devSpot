const Project = require("../models/project");
const User = require("../models/user");

module.exports = {
  create,
  show,
  userProjects
};

async function create(req, res) {
  
  const project = new Project(req.body);
  try {
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  console.log("user id: ", req.user)
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.json(projects);
}

async function userProjects(req, res) {
  console.log(req.params.username)
  User.findOne({user_name: req.params.username}, async function(err, user){
    const projects = await Project.find({ user: user.id }).sort({
      createdAt: -1
    });
    res.json(projects);
  })
}
