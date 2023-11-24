import React, { useEffect, useState } from 'react';
import "./AuthLayout.css";
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Navigate, useNavigate } from 'react-router-dom';

export const AuthLayout = () => {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitSignIn = async (event) => {
    event.preventDefault(); 
    setError('');
    setLoading(true);
    await fetch(process.env.REACT_APP_API_URL + '/auth/signin', {
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: { 'Content-type': 'application/json' }
    })
    .then((res) => res.json())
    .then((data) => {
      if (data === 'Invalid email') {
        setError("Email không hợp lệ!");
      }
      else if (data === "Invalid password") {
        setPassword('');
        setError("Mật khẩu không hợp lệ");
      }
      else if (data.role === 0) {
        setError("Tài khoản không có quyền truy cập!");
      }
      else if (data.role !== 1) {
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('isAuth', true);
        navigate("/")
      }
      else {
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('isAuth', true);
        navigate("/shipper")
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      setError('Something went wrong!');
    });
  }

  useEffect(() => {
    if (sessionStorage.getItem('isAuth') === 'true') {
      navigate("/admin");
    }
  }, [])

  return (
    <> 
        <div className='page auth_page'>
            <div className='auth_form'>
              {!loading ? (
                <> 
                  <h1>Đăng nhập</h1>
                  <form onSubmit={handleSubmitSignIn}> 
                    <TextField 
                      fullWidth
                      label="Email" 
                      variant="standard"
                      type='email'
                      required
                      error={error === "Email không hợp lệ!" ? true : false}
                      focused={error === "Email không hợp lệ!" ? true : false}
                      value={email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={((e) => setEmail(e.target.value))}
                    />
                    <TextField 
                      fullWidth
                      error={error === "Mật khẩu không hợp lệ" ? true : false}
                      focused={error === "Mật khẩu không hợp lệ" ? true : false}
                      required
                      sx={{ marginTop: '20px', fontSize: '50px' }}
                      label="Password" 
                      variant="standard"
                      type='password'
                      value={password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={((e) => setPassword(e.target.value))}
                    />
                    <span className='error'>{error}</span>
                    <button type='submit' className='mybutton'>Đăng nhập</button>

                  </form>
                  <span className='note'>*Liên hệ với bộ phận IT nếu quên mật khẩu</span>
                </>
              ) : (
                <span className="loader"></span>
              )}
            </div>
        </div> 
    </>
  )
}
