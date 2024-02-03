import React, {useContext, useState} from 'react'
import UserContext from "../Dashboard/Dashboard"
import FriendsDisplayer from '../FriendsDisplayer/FriendsDisplayer'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [addingNewFriend, setAddingNewFriend] = useState(false)
  const user = useContext(UserContext)
  return (
    <div>
      <div>
        <input type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}></input>
        <button onClick={() => setAddingNewFriend(prevState => !prevState)}>{addingNewFriend ? "View Friends" : "Add Friend"}</button>
      </div>
      <div>
        <FriendsDisplayer filter={searchInput} addingFrend = {addingNewFriend}></FriendsDisplayer>
      </div>
    </div>
  )
}

export default Search