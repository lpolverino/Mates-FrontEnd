import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  
    const navigator = useNavigate()

    const showProfile = (e) =>{
        e.preventDefault()
        navigator("/profile")
    } 
  
    return (
    <div>
        <button> Friends </button>
        <button> Groups </button>
        <button onClick={showProfile}> Perfil </button>
    </div>
  )
}

export default Header