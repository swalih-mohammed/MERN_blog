import axios from 'axios'

const API_URL = '/api/posts/'

// Create post
const createPost = async (postData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, postData, config)
    return response.data
}

// Get posts
const getPosts = async () => {
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // }
    const response = await axios.get(API_URL)
    return response.data
}


// Get single post
const getPost = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// edit post
const updatePost = async (postId, data, token) => {
    console.log(data)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + postId, data, config)
    return response.data
}

// Delete post
const deletePost = async (postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + postId, config)
    return response.data
}

const postService = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
}
export default postService
