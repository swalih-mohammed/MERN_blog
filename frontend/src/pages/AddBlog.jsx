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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createPost, reset } from '../features/posts/postSlice'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function AddBlog() {

    const navigate = useNavigate()

    const { posts, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.posts
    )

    const dispatch = useDispatch()
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        title: '',
        sub_title: '',
        content: '',
    })
    const { title, sub_title, content } = formData

    useEffect(() => {
        if (isError) {
            // toast.error(message)
            console.log(message)
        }

        // if (isSuccess) {
        //     // navigate('/account')
        //     setOpen(true);
        // }

        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch])


    const handleOpenSnack = () => {
        setSnackOpen(true);
    };

    const HanldeCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!title || !content) {
            console.log("no data")
        } else {
            const data = {
                title,
                sub_title,
                content,
            }
            // console.log(data)
            dispatch(createPost(data))
            navigate('/')
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container maxWidth="lg">
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <h1>Edit Post</h1>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            autoComplete="given-name"
                            name="title"
                            value={title}
                            onChange={onChange}
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            autoFocus
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="sub_title"
                            value={sub_title}
                            onChange={onChange}
                            required
                            fullWidth
                            id="name"
                            label="Sub Title"
                            autoFocus
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="content"
                            value={content}
                            onChange={onChange}
                            required
                            fullWidth
                            id="name"
                            label="Content"
                            autoFocus
                            multiline
                        />
                    </Grid>
                </Grid>
                <Button
                    onClick={onSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>
            </Box>

            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={HanldeCloseSnack}>
                <Alert onClose={HanldeCloseSnack} severity="success" sx={{ width: '100%' }}>
                    Post added successfully
                </Alert>
            </Snackbar>
        </Container >
    );
}