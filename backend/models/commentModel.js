const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post',
        },
        content: {
            type: String,
            required: [true, 'Please add a text value'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Comment', commentSchema)
