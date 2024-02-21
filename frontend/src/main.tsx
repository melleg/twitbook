import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ViewPostsComponent from './post/ViewPostComponent.tsx'
import Home from './routes/Home.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginComponent from './login/LoginComponent.tsx'
import RegisterComponent from './regsiter/RegisterComponent.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "posts",
        element: <ViewPostsComponent />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "register",
        element: <RegisterComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);