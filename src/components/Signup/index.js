import React from 'react';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Navbar';


export default function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password1, setPassword1] = useState("");
  const [Password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const normalLogin = async () => {
    if (Password1 !== Password2) {
      return toast.error('Invalid confirm password!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    let response = await fetch(process.env.REACT_APP_HOST_NAME + "api/signup", {
      method: "post",
      body: JSON.stringify({ Name: name, Password: Password1, Email: Email }),
      headers: { 'content-type': 'application/json' }
    });
    response = await response.json();
    // // console.log(response);
    if (response.success === 1) {
      Cookies.set('user', JSON.stringify(response.user));
      Cookies.set('jwtoken', response.jwtoken, { expires: 7, secure: false });
      navigate('/dashboard');  
      
      return toast.success(response.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (response.success === 0) {
      return toast.error(response.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    
  }

  async function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    // console.log(accessToken);
    let response = await fetch(process.env.REACT_APP_HOST_NAME + "/signup", {
      method: "post",
      body: JSON.stringify({ googleAccessToken: accessToken }),
      headers: { 'content-type': 'application/json' }
    });
    response = await response.json();
    // console.log(response);

    Cookies.set('user', JSON.stringify(response.user));
    Cookies.set('jwtoken', response.jwtoken, { expires: 7, secure: false });
    navigate('/dashboard');

  }

  const googleLogin = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
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
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

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
                        {/* Name Field */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              value={Email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        {/* Password Field */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password1"
                              value={Password1}
                              onChange={(e) => setPassword1(e.target.value)}
                              required
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password2"
                              value={Password2}
                              onChange={(e) => setPassword2(e.target.value)}
                              required
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>

                        {/* Register Button */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={normalLogin}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Image Section */}
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

  )
}
