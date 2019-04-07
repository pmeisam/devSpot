const Project = require("../models/project");
const User = require("../models/user");


module.exports = {
  create,
  show,
  userProjects,
  likeProject
};

async function create(req, res) {
  const project = new Project(req.body);
  try {
    User.findOne({ _id: project.user }, function(err, user) {
      user.projects.push(project.id);
      user.save();
    });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  const projects = await Project.find({}).populate('user').sort({ createdAt: -1 });
  // console.log('req.user: ', req.user)
  res.json(projects);
}

async function userProjects(req, res) {
  const user = await User.findOne({ user_name: req.params.username }).populate(
    "projects"
  );
  res.json(user);
}

async function likeProject(req, res) {
  Project.findOne({_id: req.body.projectId}, async function(err, project){
    if(project.likes.includes(req.body.userCopy.email)){
      project.likes.splice(req.body.userCopy.email, 1)
    } else {
      project.likes.push(req.body.userCopy.email);
    }
    project.save();
    res.json(project);
  })
}
