import { createBrowserRouter } from "react-router-dom";
import Landing from "../View/Landingpage";
import Login_candidate from "../Pages/authentication/CandidateLogin";
import ProtectedRoute from "../utils/ProtectedRoute";
import DashboardCandidate from "../Pages/Candidateprofile/DashboardCandidate";
import RegistroUser from "../Pages/RegistroUser/RegristroUser";
import Login from "../Pages/authentication/Login";

const AppRouter = createBrowserRouter([
      {
        path: "/",
        element: <Landing />
      },
      {
        path: "/login",
        element: <Login_candidate />
      },
      {
        path: "/register",
        element: <RegistroUser/>
      },
      {
        path: "/prueba",
        element: <Login/>
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardCandidate />,
          }
        ],
      },
]);
    

export default AppRouter;
