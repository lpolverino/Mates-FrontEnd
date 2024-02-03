import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import {UserContext} from "../Dashboard/Dashboard"
import utils from '../../utils';

const FriendsDisplayer = ({filter,addingFrend}) => {
    const {userData, setUserData} = useContext(UserContext)
    const [friendRquestSended, setFriendRequestSended] = useState(false)
    const [error, setError] = useState(null)

    const addFriend = async (e) =>{
      e.preventDefault()
      setFriendRequestSended(true)
      const sendRequest = async () =>{
        try{
          const backendUrl = utils.getBackendUrl() + "users/" + userData._id + "/friends"
  
          console.log(backendUrl);
          const response = await fetch(backendUrl, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${utils.getToken()}`,
            },
            method: "POST",
            body: JSON.stringify({username:filter})
          })
          const responseData =  await response.json()
          if(!response.ok){
            console.log(error);
            throw new Error(`there was a error sending the request ${error}`)
          }
          const UpdatedUser = {
            ...userData,
            friends: [...userData.friends, responseData.friend],
          }
          setUserData({
            ...userData,
            friends: userData.friends.concat([responseData.friend])
          })
        }
        catch(e){
          setError(e)
        }
        finally{
          setFriendRequestSended(false)
        }
      }
      await sendRequest()
    }

    const createNewFriendDisplayer = () => {
      return (
        <>
          {friendRquestSended
            ?<button disabled> Pending...</button>
            :<button onClick={(e) => addFriend(e)}> Send Friend Request </button>
          }
        </>
      )
    }

    const createUserFRiendsDisplayer = () => {
      return (
        <ul>
          {userData.friends.map(friend => <li key={friend._id}>{friend.username}</li>)}
        </ul>
      )
    }

    return (
    <div>
      {userData ?(addingFrend
        ? createNewFriendDisplayer()
        : createUserFRiendsDisplayer())
      : <p>Loading</p>}
    </div>
  )
}

FriendsDisplayer.propTypes ={
    filter: PropTypes.string.isRequired,
    addingFrend: PropTypes.bool.isRequired,
}

export default FriendsDisplayer