import React, { useEffect, useState, createContext } from 'react'
import Header from '../Header/Header'
import Search from '../Search/Search'
import Content from "../Content/Content"
import utils from '../../utils'


export const UserContext = createContext(null)

const Dashboard = () => {

  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect( () =>{
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
        setUserData(user)
      }
      else{
        try{
          const fetchedUser = await getData(user)
          setUserData(fetchedUser)
        }
        catch (error){
          setError(error)
          console.log(error);
        }              
      }
      setLoading(false)
    }
    loader()
  },[])
  return (
    <>
      {error && <p>There was a problem getting the user</p>}
      {!loading &&
        <UserContext.Provider value={{userData, setUserData}}>
          <Header></Header>
            <Content></Content>
            <Search></Search>
          </UserContext.Provider >
      }
    </>
  )
}

export default Dashboard