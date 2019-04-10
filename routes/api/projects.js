const express = require("express");
const router = express.Router();
const projectsCtrl = require("../../controllers/projects");

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require("../../config/auth"));
router.post("/create-post", projectsCtrl.create);
router.get("/", checkAuth, projectsCtrl.show);
router.get("/:username", checkAuth, projectsCtrl.userProjects);
router.post("/likebtn", projectsCtrl.likeProject);
router.post("/createcomment", projectsCtrl.addcommentOnProject);
router.post("/deletecomment", projectsCtrl.deleteComment);
router.post("/deleteproject", projectsCtrl.deleteProject);
router.post('/updateproject', projectsCtrl.updateProject);


function checkAuth(req, res, next) {
  console.log("api req.user: ", req.user);
  if (req.user) {
    // console.log("api req.user: ", req.user);
    return next();
  }
  return res.status(401).json({ msg: "Not Authorized" });
}
module.exports = router;
