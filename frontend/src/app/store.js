import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import postReducer from '../features/posts/postSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    posts: postReducer,
  },
})
