import * as React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Main from './Main';
import Banner from "../components/Banner"
import Post from "../components/Post"
import Spinner from "../components/Spinner"
import { getPosts, reset } from '../features/posts/postSlice'
// import { getGoals, reset } from '../features/goals/goalSlice'


export default function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  )


  useEffect(() => {
    // console.log(posts)

    if (isError) {
      console.log(message)
    }

    dispatch(getPosts())


    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <Container maxWidth="lg">
      <Banner />
      {posts.length > 0 ?
        <>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </>
        :
        null
      }

    </Container>
  );
}