const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    directMessage: String,
    file: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', messageSchema);