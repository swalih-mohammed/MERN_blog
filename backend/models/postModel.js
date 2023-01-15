const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        sub_title: {
            type: String,
            required: [true, 'Please add a text value'],
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

module.exports = mongoose.model('Post', postSchema)
