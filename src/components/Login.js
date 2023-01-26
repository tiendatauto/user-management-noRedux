import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loginApi } from '../services/fetchUser';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UsersContext';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  const navigate = useNavigate();
  const { loginContext, user } = useContext(UserContext);
  //   useEffect(() => {
  //     let token = localStorage.getItem('token');
  //     if (token) {
  //       navigate('/');
  //     }
  //   }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email/password is required');
      return;
    } else {
      setLoadingApi(true);
      let res = await loginApi(email.trim(), password);
      console.log('res', res);
      if (res && res.token) {
        // localStorage.setItem('token', res.token);
        loginContext(email, res.token);
        navigate('/');
      } else {
        // error
        if (res && res.status === 400) {
          toast.error(res.data.error);
        }
      }
      setLoadingApi(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handlePressEnter = (e) => {
    // console.log('event ', e.key);
    if (e && e.key === 'Enter') {
      handleLogin();
    }
  };
  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">Email or username (eve.holt@reqres.in)</div>
        <input
          type="text"
          placeholder="Email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-2">
          <input
            type={isShowPassword === true ? 'text' : 'password'}
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <i
            className={
              isShowPassword === true
                ? 'fa-solid fa-eye'
                : 'fa-solid fa-eye-slash'
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>

        <button
          className={email && password ? 'active' : ''}
          disabled={email && password ? false : true}
          onClick={handleLogin}
        >
          {loadingApi && <i className="fa-solid fa-sync fa-spin"></i>}
          &nbsp;Login
        </button>
        <div className="back" style={{ cursor: 'pointer' }}>
          <i className="fa-solid fa-angles-left"></i>
          <span onClick={() => handleGoBack()}> &nbsp; Go Back</span>
        </div>
      </div>
    </>
  );
}
