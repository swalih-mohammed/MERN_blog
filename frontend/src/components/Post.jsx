import * as React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import CssBaseline from '@mui/material/CssBaseline';



// import Divider from '@mui/material/Divider';


function Post(props) {
    const { post } = props



    // console.log(tit)
    return (
        // <div style={{ marginBottom: 10, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
        <div>
            {/* <Typography sx={{ textAlign: "left" }} variant="h4" gutterBottom>
                {post.author}
            </Typography> */}
            <Divider />
            {/* <div style={{ marginBottom: 10, marginTop: 5, alignItems: "flex-start" }}> */}
            <Typography sx={{ textAlign: "left" }} variant="h4" gutterBottom>
                {post.title}
            </Typography>
            <Typography sx={{ textAlign: "left", marginBottom: 2 }} variant="body2" >
                {post.sub_title}
            </Typography>

            {/* </div> */}
            <Typography sx={{ textAlign: "left" }} variant="body1" gutterBottom>
                {post.content.substring(0, 500)}
            </Typography>

            <Link className="btn-item auction-btn mr-2" to={`/${post._id}`}>
                <Typography sx={{ textAlign: "left", marginBottom: 1 }} variant="subtitle1" color="primary">
                    Continue reading...
                </Typography>
            </Link>



        </div>)
}


export default Post;