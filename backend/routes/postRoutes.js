const express = require('express')
const router = express.Router()

const {
    getpost, getposts, setpost, deletePost, updatePost
} = require('../controllers/postController')


const { protect } = require('../middleware/authMiddleware')


router.route('/').get(getposts).post(protect, setpost)
router.route('/:id').delete(protect, deletePost).put(protect, updatePost).get(getpost)

module.exports = router
