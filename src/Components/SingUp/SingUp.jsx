import React, { useState } from 'react'
import utils from '../../utils'

import { useNavigate } from 'react-router-dom';

const SingUp = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordDuplicate, setPasswordDuplcate] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();


  const handleSUbmit = async (e) =>{
    e.preventDefault()
    const backendUrl = utils.getBackendUrl() + "users/"
    if (password !== passwordDuplicate) {
      setError("Passwords dont match")
    }else{
      const response = await fetch(backendUrl + "sing-up", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({username, password})
      })
      if(response.ok) {
        const data = await response.json()
        data.message && navigate("/")
      }

      setError(`There was an HTTP ERROR:${response.status}`)
    }
  }

  return (
    <div>
        <h1>Sing Up</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSUbmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input 
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password-duplicate">Confirm Password</label>
                <input
                type="password"
                name="password-duplicate"
                id="password-duplicate"
                value={passwordDuplicate}
                onChange={(e) => setPasswordDuplcate(e.target.value)}
                />
            </div>
            <button>Sing Up!</button>
        </form>
    </div>
  )
}

export default SingUp