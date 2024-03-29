import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Home from "./routes/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginComponent from "./auth/LoginComponent.tsx";
import Profile from "./user/Profile.tsx";
import RegisterComponent from "./auth/RegisterComponent.tsx";
import RegisterSuccess from "./auth/RegisterSuccess.tsx";
import SearchResult from "./search/SearchResult.tsx";
import PostDetails from "./post/PostDetails.tsx";
import Follows from "./user/Follows.tsx";

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
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "profile/:username",
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "following",
            element: <Follows showFollowers={false} />,
          },
          {
            path: "followers",
            element: <Follows showFollowers={true} />,
          },
        ],
      },
      {
        path: "posts/:id",
        element: <PostDetails />,
      },
      {
        path: "search",
        element: <SearchResult />,
      },
      {
        path: "register",
        children: [
          {
            path: "",
            element: <RegisterComponent />,
          },
          {
            path: "success",
            element: <RegisterSuccess />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
