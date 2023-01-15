import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    posts: [],
    post: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create  post
export const createPost = createAsyncThunk(
    'posts/create',
    async (postData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await postService.createPost(postData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get  single post
export const getPost = createAsyncThunk(
    'post/getSingle',
    async (id, thunkAPI) => {
        try {
            console.log(id, "id from post slice")
            // const token = thunkAPI.getState().auth.user.token
            return await postService.getPosts(id)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get  posts
export const getPosts = createAsyncThunk(
    'post/getAll',
    async (_, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token
            return await postService.getPosts()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Edit post
export const updatePost = createAsyncThunk(
    'plosts/update',
    async (id, data, thunkAPI) => {
        console.log("updating from slcice ")
        // const test = thunkAPI.getState().auth.user.token
        // console.log(test, "token")
        try {
            const token = thunkAPI.getState().auth.user.token
            return await postService.updatePost(id, data, token)
        } catch (error) {
            console.log("error in udpate post slice", error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
// Delete post
export const deletePost = createAsyncThunk(
    'plosts/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await postService.deletePost(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

            // create post
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // get all posts 
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // get single post
            .addCase(getPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.post = action.payload
            })
            .addCase(getPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            // update post
            .addCase(updatePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.push(action.payload)
                // state.posts = state.posts.filter(
                //     (post) => post._id !== action.payload.id
                // )
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            // delete post
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload.id
                )
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
