import React, { useEffect, useState } from 'react'
import utils from '../../utils'

const Dashboard = () => {

    const [data, setData] = useState(null)

useEffect( () => {
    const getData = async () =>{
        const backendUrl = utils.getBackendUrl() +"users/"
        const response = await fetch(backendUrl, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${utils.getToken()}`,
              },
              method: "GET",
        })
        const responseData = await response.json()
        setData(responseData)
    }
    getData()
},[])
  return (
    <div>Dashboard
    </div>
  )
}

export default Dashboard