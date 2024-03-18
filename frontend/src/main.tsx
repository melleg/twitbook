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
        element: <Profile />,
      },
      {
        path: "search/:id",
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
