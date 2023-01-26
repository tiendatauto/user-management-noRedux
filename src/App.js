import Container from 'react-bootstrap/esm/Container';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/UsersContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log('user', user);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(
        localStorage.getItem('email'),
        localStorage.getItem('token')
      );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes> */}
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
    </>
  );
}

export default App;
