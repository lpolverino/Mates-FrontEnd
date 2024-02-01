import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {


  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)


    // Inside the handleLogin function
  if(isLoggedIn){
      navigate('/dashboard')
  }

  const handleSUbmit = (e) =>{
    e.preventDefault()
    setIsLoggedIn(true)
  }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSUbmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" />
            </div>
            <button>Log in</button>
        </form>
        <div>
            <p>If you dont have and account you can try for free</p>
            <button>Sing Up!</button>
        </div>
    </div>
  )
}


export default Login