const express = require("express");
const router = express.Router();
const projectsCtrl = require("../../controllers/projects");

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(require("../../config/auth"));
router.post("/create-post", checkAuth, projectsCtrl.create);
router.get("/", checkAuth, projectsCtrl.show);
router.get("/:username", checkAuth, projectsCtrl.userProjects);
router.post("/likebtn", checkAuth, projectsCtrl.likeProject);
router.post("/createcomment", checkAuth, projectsCtrl.addcommentOnProject);
router.post("/deletecomment", checkAuth, projectsCtrl.deleteComment);
router.post("/deleteproject", checkAuth, projectsCtrl.deleteProject);
router.post("/updateproject", checkAuth, projectsCtrl.updateProject);

function checkAuth(req, res, next) {
  // console.log("api req.user: ", req.user);
  if (req.user) {
    // console.log("api req.user: ", req.user);
    return next();
  }
  return res.status(401).json({ msg: "Not Authorized" });
}
module.exports = router;
