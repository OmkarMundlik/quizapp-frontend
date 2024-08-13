import React from 'react'

function Login() {
	const loginwithGoogle = ()=>{
		window.open("http://localhost:8000/auth/google/callback", "_self")
	}
  return (
	<div>
		<button className='btn btn-primary' onClick={loginwithGoogle}>LOGIN</button>
	</div>
  )
}

export default Login
