const express = require('express')
const router = express.Router()

const {
    getposts, setpost, deletePost, updatePost
} = require('../controllers/postController')
const {
    getComments,
    setComment,
    updateComment,
    deleteComment,
} = require('../controllers/commentController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getComments).post(protect, setComment)
router.route('/:id').delete(protect, deleteComment).put(protect, updateComment)

module.exports = router
