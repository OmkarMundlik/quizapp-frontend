import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Navbar from '../Navbar';

export default function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    // console.log(accessToken);

    let response = await fetch(process.env.REACT_APP_HOST_NAME + 'api/login', {
      method: 'POST',
      body: JSON.stringify({ googleAccessToken: accessToken }),
      headers: { 'content-type': 'application/json' },
    });
    
    response = await response.json();
    // console.log(response);

    if (response.success === 1) {
      Cookies.set('jwtoken', response.jwtoken, { expires: 7 });
      Cookies.set('user', JSON.stringify(response.user), { expires: 7 });

      navigate('/dashboard');
    } else {
      toast.error(response.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }

  const handleClick = async () => {
    let response = await fetch(process.env.REACT_APP_HOST_NAME + 'api/login', {
      method: 'POST',
      body: JSON.stringify({ email: Email, password: Password }),
      headers: { 'content-type': 'application/json' },
    });

    response = await response.json();
    // console.log(response);

    if (response.success === 1) {
      Cookies.set('jwtoken', response.jwtoken, { expires: 7 });
      Cookies.set('user', JSON.stringify(response.user), { expires: 7 });
      navigate('/dashboard');
    } else {
      toast.error(response.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
  });

  return (
<>
  <Navbar />
  <section className="vh-100" style={{ backgroundColor: '#eee' }}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: '25px' }}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                {/* Form Section */}
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                  {/* Social Sign-in Options */}
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-floating mx-1"
                      onClick={() => googleLogin()}
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="btn btn-primary btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button type="button" className="btn btn-primary btn-floating mx-1">
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                  </div>

                  {/* Centered Divider */}
                  <div className="divider d-flex align-items-center my-4">
                    <hr className="flex-grow-1" />
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    <hr className="flex-grow-1" />
                  </div>

                  <form className="mx-1 mx-md-4">
                    {/* Email Input */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          placeholder="Enter a valid email address"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                          value={Email}
                        />
                        <label className="form-label">Email address</label>
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          placeholder="Enter password"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                          value={Password}
                        />
                        <label className="form-label">Password</label>
                      </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <a href="#!" className="text-body">
                        Forgot password?
                      </a>
                    </div>

                    {/* Login Button */}
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={handleClick}
                      >
                        Login
                      </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?{' '}
                        <a href="/signup" className="link-danger">
                          Register
                        </a>
                      </p>
                    </div>
                  </form>
                </div>

                {/* Image Section */}
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    className="img-fluid"
                    alt="Sample"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ToastContainer />
</>
  );
}
