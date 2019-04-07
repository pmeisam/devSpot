const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/projects');

/*---------- Public Routes ----------*/
router.get('/', projectsCtrl.show);
router.get('/:username', projectsCtrl.userProjects);
router.post('/', projectsCtrl.create);
router.post('/:projectid/:userid', projectsCtrl.likeProject);


/*---------- Protected Routes ----------*/
module.exports = router;