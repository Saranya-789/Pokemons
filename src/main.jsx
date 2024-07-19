import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import Pokemon from './routes/Pokemon';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/pokemon/:id",
    element: <Pokemon/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
