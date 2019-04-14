const Project = require("../models/project");
const User = require("../models/user");

module.exports = {
  create,
  show,
  userProjects,
  likeProject,
  addcommentOnProject,
  deleteComment,
  deleteProject,
  updateProject
};

async function create(req, res) {
  const project = new Project(req.body);
  try {
    User.findOne({ _id: project.user },  function(err, user) {
      user.projects.unshift(project.id);
      user.save();
    });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  const projects = await Project.find({})
    .populate("user")
    .sort({ createdAt: -1 });
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
  Project.findOne({ _id: req.body.projectId }, async function(err, project) {
    if (project.likes.includes(req.body.userCopy._id)) {
      project.likes.splice(req.body.userCopy._id, 1);
    } else {
      project.likes.push(req.body.userCopy._id);
    }
    project.save();
    res.json(project);
  });
}

async function addcommentOnProject(req, res) {
  Project.findOne({ _id: req.body.projectInfo._id }, async function(
    err,
    project
  ) {
    project.comments.push({
      comment: req.body.comment,
      user_name: req.body.userInfo.user_name,
      user_id: req.body.userInfo._id
    });
    await project.save();
    res.json(project);
  });
}

async function deleteComment(req, res) {
  Project.findOne({ _id: req.body.project._id }, async function(err, project) {
    project.comments.forEach((c, idx) => {
      if (c._id == req.body.comment._id) {
        project.comments[idx].remove();
      }
    });
    await project.save();
    res.json(project);
  });
}

async function deleteProject(req, res) {
  // console.log(req.body);
  Project.findOne({ _id: req.body._id }, function(err, project) {
    User.findOne({_id: project.user[0]}, function(err, user){
      const projects = user.projects.filter(p=>{
        return p != req.body._id
      })
      user.projects = projects;
      user.save()
    })
    project.remove();
    project.save();
    res.json(project);
  });
}

async function updateProject(req, res) {
  Project.findOne({ _id: req.body._id }, function(err, project) {
    project.url = req.body.url;
    project.caption = req.body.caption;
    project.save();
    res.json(project);
  });
}
