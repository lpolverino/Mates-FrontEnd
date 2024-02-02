import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import utils from "../../utils"


const Profile = () => {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [userDescription, setUserDescription] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userBirthDate, setUserBirthDate] = useState(null)

  const [editProfile, setEditProfile] = useState(false)
  const [sendingUpdate, setSendingUpdate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() =>{

    const updateUser = (newUser) => {
      setUser(newUser)
      setUsername(newUser.username)
      setUserDescription(newUser.description)
      setUserEmail(newUser.email)
      setUserBirthDate( new Date(newUser.date_of_birth))
    }

    const loader = async() =>{

      const getData = async (userId) =>{
        const backendUrl = utils.getBackendUrl() +"users/" + userId
        const response = await fetch(backendUrl, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${utils.getToken()}`,
              },
              method: "GET",
        })
        const responseData = await response.json()
        const userData = responseData.user
        return userData
      }
      const user = await utils.getUser()
      if (user.username !== undefined) {
        updateUser(user)
      }
      else{
        try{
          const fetchedUser = await getData(user)
          updateUser(fetchedUser)
        }
        catch (error){
          setError(error)
          console.log(error);
        }              
      }
      setLoading(false)
    }
    if(!sendingUpdate) loader()
  }, [sendingUpdate])

  const createDisplayer = () => {

    const handleClick = (e) => {
      e.preventDefault()

      setEditProfile(true)
    }

    return (
      <>
      <h1>Profile: {user.username}</h1>
      <p>{user.email}</p>
      <p>{user.description}</p>
      <p>Birth Date:{user.date_of_birth}</p>
      <p>Registed since: {user.date_account_creation}</p>

      <button onClick={handleClick}>Edit Profile</button>
      </>
    )
  }

  const createProfileForm = () =>{

    const handleSubmit = async (e) =>{
      e.preventDefault()
      setSendingUpdate(true)
      const user =  await utils.getUser()
      const backendUrl = utils.getBackendUrl() +"users/" +  user
      const body =JSON.stringify({username, description:userDescription, email:userEmail, birth_date:userBirthDate})
      try{
        const response = await fetch(backendUrl, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${utils.getToken()}`,
            },
            method: "PUT",
            body
        })
        if(response.ok){
          setEditProfile(false)
          navigate("/profile")
        }else{
          const responseData = response.json()
          const error = new Error("The was an error updating the Profile" +response.status + "message:" + responseData.message)
          throw error
        }
      }catch(error){
        console.log(error);
        setError(error)
      }finally{
        setSendingUpdate(false)
        setEditProfile(false)
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input type='email' name='email' id='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/> 
        
        <label htmlFor="description">Description</label>
        <input type='textarea' name='description' id='description' value={userDescription} onChange={(e) => setUserDescription(e.target.value)}/>
        
        <label htmlFor="birth_date">Username</label>
        <input type='date' name='birth_date' id='birth_date' value={
          userBirthDate.getFullYear().toString() +
          "-" +
          (userBirthDate.getMonth() + 1).toString().padStart(2, 0) +
          "-" +
          userBirthDate.getDate().toString().padStart(2, 0)
        } onChange={(e) => setUserBirthDate(new Date(e.target.value))}/>
        
        {!sendingUpdate
          ? <button> Save </button>
          : <button disabled> Save </button>
        }
      </form>
    )
  }

  return (
    <div>
      {loading && <p>Waiting</p>}
      {error && <p>THere was an error</p>}
      {(!loading && !user && !error) && 
          <p>F</p>}
      {(!loading && user && !error) && (!editProfile ? createDisplayer() : createProfileForm())}
    </div>
  )
}

export default Profile