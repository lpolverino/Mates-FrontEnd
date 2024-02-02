import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App.jsx'
import Login from './Components/Login/Login.jsx';
import Profile from './Components/Profile/Profile.jsx';
import { createBrowserRouter,RouterProvider, Navigate} from 'react-router-dom';import './index.css'
import SingUp from './Components/SingUp/SingUp.jsx';


const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path:"sing-up",
    element:<SingUp></SingUp>
  },
  {
    path:"profile",
    element:<Profile></Profile>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
)
