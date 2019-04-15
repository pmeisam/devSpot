const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.get('/users', usersCtrl.getAllUsers )
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'))
router.get('/notifications', usersCtrl.getNotifications);


function checkAuth(req, res, next) {
    // console.log("api req.user: ", req.user);
    if (req.user) {
      // console.log("api req.user: ", req.user);
      return next();
    }
    return res.status(401).json({ msg: "Not Authorized" });
  }
module.exports = router;