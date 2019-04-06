const mongoose = require('mongoose');
const Schema = mongoose.Schema

const projectSchema = new Schema(
    {
        url: String,
        caption: String,
        user: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        likes: [],
        comments: [{user: String, comment: String}]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Project", projectSchema);