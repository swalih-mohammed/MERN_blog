const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')


// @desc    Get single post
// @route   GET /api/post
// @access  Private

const getpost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
    // res.json("test")
})


// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getposts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

// @desc    Set post
// @route   POST /api/posts
// @access  Private
const setpost = asyncHandler(async (req, res) => {
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

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
    console.log(req.user, "post controller")
    const post = await Post.findById(req.params.id)
    console.log("updating post")

    if (!post) {
        res.status(400)
        console.log("no post")
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        console.log("not authenticated")
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (post.author.toString() !== req.user.id) {
        res.status(401)
        console.log("not authorized")
        throw new Error('User not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    console.log("post from update controller", updatedPost)
    res.status(200).json(updatedPost)
})

// @desc    Delete post
// @route   DELETE /api/post/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
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
    if (post.author.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await post.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getpost,
    getposts,
    setpost,
    updatePost,
    deletePost
}
