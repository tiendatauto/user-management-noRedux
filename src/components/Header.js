import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//usecontext
import { useContext } from 'react';
import { UserContext } from '../context/UsersContext';

export default function Header(props) {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);
  const [hideHeader, setHideHeader] = useState(false);

  //   useEffect(() => {
  //     if (window.location.pathname === '/login') {
  //       setHideHeader(true);
  //     }
  //   }, []); // không sử dụng được cách true/false conditional rendering vì dính navlink của router dom, ko render lại, chỉ render 1 lần
  console.log('userContext', user);
  const handleLogOut = () => {
    logout(); // ví dụ khi xài useContext
    // localStorage.removeItem('token'); // lúc chưa xài useContext
    navigate('/');
    toast.success('Log out success');
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="nav-link">
              <img
                src={logoApp}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              <span>Quản lý sinh viên</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) || window.location.pathname === '/') && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>

                  <NavLink to="/users" className="nav-link">
                    Manage Users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.auth && (
                    <span className="nav-link">Welcome {user.email}</span>
                  )}
                  <NavDropdown title="Setting">
                    {user && user.auth === true ? (
                      <NavDropdown.Item
                        onClick={() => {
                          handleLogOut();
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Log in
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
