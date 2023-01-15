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
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { getPosts, reset as postReset } from '../features/posts/postSlice'
import { logout, reset as authReset } from '../features/auth/authSlice'

export default function Home() {

    const [dialogOpen, setDialogueOpen] = React.useState(false);

    const handleClickOpen = () => {
        setDialogueOpen(true);
    };

    const handleClose = () => {
        setDialogueOpen(false);
    };


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { posts, isLoading, isError, message } = useSelector(
        (state) => state.posts
    )

    const handle_logout = () => {
        console.log("loggin out")
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
    }

    useEffect(() => {
        console.log("account page")

        if (isError) {
            console.log(message)
        }

        dispatch(getPosts())


        return () => {
            dispatch(postReset())
        }
    }, [navigate, isError, message, dispatch])

    const filter_post_by_author = posts.filter((post) => post.author === String(user._id))
    console.log(filter_post_by_author)

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container maxWidth="lg">
            <div>
                <Typography variant="h5" gutterBottom>
                    My Profile
                </Typography>

                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Stack spacing={2} direction="row">
                            <Typography variant="body1" gutterBottom>
                                Username
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {user.name}
                            </Typography>
                        </Stack>
                        <Stack spacing={2} direction="row">
                            <Typography variant="body1" gutterBottom>
                                email
                            </Typography>
                            <Typography sx={{ mb: 3 }} variant="body1" gutterBottom>
                                {user.email}
                            </Typography>
                        </Stack>
                        <Stack spacing={2} direction="row">
                            <Button onClick={handle_logout} variant="outlined">Log out</Button>
                        </Stack>
                    </Paper>
                </Box>
                <Box>
                    <Stack spacing={2} sx={{ mb: 3 }}>
                        <Button onClick={() => navigate('/add-blog')} variant="outlined">Add a Blog</Button>
                    </Stack>
                    <Typography sx={{ textAlign: "left" }} variant="h5" gutterBottom>
                        My Blogs
                    </Typography>

                </Box>
            </div>
            {
                posts.length > 0 ?
                    <>
                        {posts.map((post) => (
                            <Post key={post._id} post={post} />
                        ))}
                    </>
                    :
                    null
            }
            <>
                <Dialog
                    open={dialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this post?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleClose} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </>

        </Container >
    );
}