const express = require("express");
const router = express.Router();
const projectsCtrl = require("../../controllers/projects");

/*---------- Public Routes ----------*/
router.post("/create-post", projectsCtrl.create);

/*---------- Protected Routes ----------*/
router.use(require("../../config/auth"));
router.post("/likebtn", projectsCtrl.likeProject);
router.get("/", checkAuth, projectsCtrl.show);
router.get("/:username", projectsCtrl.userProjects);

function checkAuth(req, res, next) {
  if (req.user) {
    // console.log("api req.user: ", req.user);
    return next();
  }
  return res.status(401).json({ msg: "Not Authorized" });
}
module.exports = router;
