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

import Banner from "./Banner"
import Post from "./Post"
import Spinner from "./Spinner"
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

import { updatePost, reset } from '../features/posts/postSlice'

export default function PostDetail(props) {
    // const { title, sub_title, content } = props
    // console.log(props)
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { posts, isLoading, isError, message } = useSelector(
    //     (state) => state.posts
    // )

    // useEffect(() => {
    //     console.log("id")
    //     if (isError) {
    //         console.log(message)
    //     }
    //     dispatch(getPosts())
    //     return () => {
    //         dispatch(reset())
    //     }
    // }, [navigate, isError, message, dispatch])


    const [formData, setFormData] = useState({
        title: props.title ? props.title : '',
        sub_title: props.sub_title ? props.sub_title : '',
        content: props.content ? props.content : '',
    })
    const { title, sub_title, content } = formData


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    // const token = thunkAPI.getState().auth.user.token

    const onSubmit = (e) => {
        e.preventDefault()
        if (!title || !content || !props.id) {
            console.log("no data")
        } else {
            const data = {
                title,
                sub_title,
                content,
            }
            // console.log(props.id, data)
            dispatch(updatePost(props.id, data))
        }
    }


    // if (isLoading) {
    //     return <Spinner />
    // }

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
                    Edit
                </Button>
            </Box>
        </Container >
    );
}