const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private

const getComments = asyncHandler(async (req, res) => {
    // const posts = await Post.find({ user: req.user.id })
    const posts = await Post.find()
    res.status(200).json(posts)
    // res.json("test")
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setComment = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400)
        throw new Error('Title and content are required')
    }
    const post = await Post.create({
        title: req.body.title,
        sub_title: req.body.sub_title,
        content: req.body.content,
        author: req.user.id,
    })

    res.status(200).json(post)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
    const Post = await Post.findById(req.params.id)

    if (!Post) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (Post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPost)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await post.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getComments,
    setComment,
    updateComment,
    deleteComment,
}
