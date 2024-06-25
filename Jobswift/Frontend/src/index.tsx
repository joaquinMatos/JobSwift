import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthLogin';
import Landing from './Pages/LandingPage/Landing';
import LoginComponent from './Pages/authentication/CandidateLogin';
import DashboardCandidate from './components/Candidate/DashboardCandidate';

const AppRouter = createBrowserRouter([
  {
    path:"/",
    element: <Landing/>
  },
  {
    path:"/login",
    element: <LoginComponent/>
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



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router = {AppRouter}/>
    </AuthProvider>
  </React.StrictMode>
);
