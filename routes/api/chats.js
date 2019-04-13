const express = require('express');
const router = express.Router();
const chatCtrl = require('../../controllers/chats');

router.get('/', chatCtrl.allChatsIndex);
router.post('/createChat', chatCtrl.createChat)

module.exports = router;