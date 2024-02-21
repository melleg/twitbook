import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Home from "./routes/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginComponent from "./login/LoginComponent.tsx";
import Profile from "./user/Profile.tsx";
import RegisterComponent from './register/RegisterComponent.tsx'

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
        path: "register",
        element: <RegisterComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
