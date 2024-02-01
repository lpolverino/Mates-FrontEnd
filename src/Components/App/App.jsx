import { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
import utils from "../../utils"
import Dashboard from '../Dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    const loader = async() =>{
      const user = await utils.getUser()
      const isUserLoged = user !== null
      console.log(isUserLoged);
      setUser(isUserLoged)
      setLoading(false)
    }
    loader()
  }, [])

  return (
    <div>
      {(!user && !loading)
        ?(
          <Navigate to="/login" replace={true} />
        )
        :<Dashboard></Dashboard>
        }
        <div>App</div>
    </div>
  )

}

export default App
