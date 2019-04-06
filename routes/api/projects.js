const express = require('express');
const router = express.Router();
const projectsCtrl = require('../../controllers/projects');

/*---------- Public Routes ----------*/
router.get('/', projectsCtrl.show);
router.get('/:username', projectsCtrl.userProjects);
router.post('/', projectsCtrl.create);


/*---------- Protected Routes ----------*/
module.exports = router;