import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetail from './pages/PostDetail';
import Account from './pages/Account';
import AddBlog from './pages/AddBlog';


const theme = createTheme({
  status: {
    // danger: orange[500],
  },
});

function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div className='container'>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/account' element={<Account />} />
              <Route path='/:id' element={<PostDetail />} />
              <Route path='/add-blog' element={<AddBlog />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    </>
  )
}

export default App
