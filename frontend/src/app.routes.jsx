import { createBrowserRouter} from "react-router";
import Login from "./features/Auth/pages/login.jsx";
import Signup from "./features/Auth/pages/signup.jsx";
import Protected from "./features/Auth/components/protected.jsx";
import Dashboard from "./features/interview/pages/dashboard.jsx"
import GuestRoute from "./features/Auth/components/Guestroute.jsx"
import Interview from "./features/interview/pages/Interview.jsx"
import Home from "./features/Auth/pages/home.jsx";


export const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />
  },
    {
        path: "/login",
        element:<GuestRoute><Login /></GuestRoute> 
    },
    {
        path: "/signup",
        element: <GuestRoute><Signup /></GuestRoute> 
    },
    {
        path: "/dashboard",
        element: <Protected><Dashboard /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview /></Protected> 
    }
])