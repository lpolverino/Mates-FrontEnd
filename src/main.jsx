import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App.jsx'
import Login from './Components/Login/Login.jsx';
import { createBrowserRouter,RouterProvider, Navigate} from 'react-router-dom';import './index.css'
const BackendURL = "http://localhost:3000/"

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
)
