const jwt = require('jsonwebtoken');
const Message = require('./models/message');

const messages = {};

module.exports = {
    init,
    getIo
}

function init(){
    console.log('hello world');
}

function getIo() {
    console.log('getIo')
}