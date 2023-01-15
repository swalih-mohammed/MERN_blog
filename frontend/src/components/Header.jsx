import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, useNavigate } from "react-router-dom";



export default function ButtonAppBar() {

  const navigate = useNavigate();
  const navigate_to_account = () => navigate('/account')
  const navigate_to_login = () => navigate('/login')


  const { user } = useSelector((state) => state.auth)

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link className="btn-item auction-btn mr-2" to={'/'} style={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MEARN STACK Blog
            </Typography>
          </Link>
          {user ? <Button onClick={navigate_to_account} color="inherit">{user.name}</Button> :
            <Link className="btn-item auction-btn mr-2" to={'/login'} >
              <Button onClick={navigate_to_login} color="inherit">Login</Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}