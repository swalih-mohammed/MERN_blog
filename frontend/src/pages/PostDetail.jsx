import * as React from 'react';
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    useParams
} from "react-router-dom";

import Banner from "../components/Banner"
import Post from "../components/Post"
import Spinner from "../components/Spinner"
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PostForm from "../components/PostForm"
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { deletePost, getPosts, reset } from '../features/posts/postSlice'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function PostDetail() {

    const [dialogOpen, setDialogueOpen] = React.useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);


    const [isEditing, setIsEditing] = useState(false)

    const handleClickOpen = () => {
        setDialogueOpen(true);
    };

    const handleCloseDialogue = () => {
        setDialogueOpen(false);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { posts, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.posts
    )
    let { id } = useParams();

    const hanlde_delete_post = () => {
        handleCloseDialogue()
        dispatch(deletePost(id))
        setSnackOpen(true);
        navigate('/')
    }
    const handleClickSnack = () => {
        setSnackOpen(true);
    };
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        // if (isSuccess) {
        //     navigate('/')
        //     setSnackOpen(true);
        // }
        dispatch(getPosts())
        return () => {
            dispatch(reset())
        }
    }, [navigate, isError, message, dispatch])

    const post = posts?.find((item) => String(item._id) == String(id))
    const user_is_author = String(post?.author) === String(user?._id) ? true : false

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            {isEditing ? <PostForm id={post?._id} title={post?.title} sub_title={post?.sub_title} content={post?.content} /> :

                <Container maxWidth="lg">
                    <Divider />
                    <Typography sx={{ textAlign: "left" }} variant="h4" gutterBottom>
                        {post?.title}
                    </Typography>
                    <Typography sx={{ textAlign: "left", marginBottom: 2 }} variant="body2" >
                        {post?.sub_title}
                    </Typography>
                    <Typography sx={{ textAlign: "left" }} variant="body1" gutterBottom>
                        {post?.content}
                    </Typography>
                    {user_is_author && <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <EditIcon onClick={() => setIsEditing(true)} />
                        <DeleteOutlineIcon onClick={setDialogueOpen} />
                    </Stack>}
                </Container >}
            <>
                <Dialog
                    open={dialogOpen}
                    onClose={handleCloseDialogue}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete post?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this post?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialogue}>No</Button>
                        <Button onClick={hanlde_delete_post} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert onClose={setSnackOpen} severity="success" sx={{ width: '100%' }}>
                        Post deleted successfully
                    </Alert>
                </Snackbar>
            </>
        </>
    );
}