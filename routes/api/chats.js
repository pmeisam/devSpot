const express = require('express');
const router = express.Router();
const chatCtrl = require('../../controllers/chats');

router.post('/createChat', chatCtrl.createChat);
router.get('/getallchats', chatCtrl.getAllChats)

module.exports = router;