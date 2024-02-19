import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ViewPostsComponent from './post/ViewPostComponent.tsx'
import Home from './routes/Home.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginComponent from './login/LoginComponent.tsx'

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);