import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import utils from '../../utils';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSUbmit = async (e) =>{
    e.preventDefault()
    const backendUrl = utils.getBackendUrl() + "users/"
    const response = await fetch(backendUrl + "log-in", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({username, password})
    })

    const data = await response.json()
    utils.setToken(data.token)

    if(!response.ok){
      setError(`There was an error handling the login ${data.error}`)
    }
    
    navigate("/")
  }

  return (
    <div>
      {error && <p>{error}</p>}
        <h1>Login</h1>
        <form onSubmit={handleSUbmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button>Log in</button>
        </form>
        <div>
            <p>If you dont have and account you can try for free</p>
            <button onClick={() => navigate("/sing-up")}>Sing Up!</button>
        </div>
    </div>
  )
}


export default Login