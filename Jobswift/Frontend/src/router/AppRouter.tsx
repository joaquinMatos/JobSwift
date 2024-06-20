
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardCandidate from '../Pages/Candidateprofile/DashboardCandidate';
import Landing from '../Pages/LandingPage/Landing';
import LoginComponent from '../Pages/authentication/CandidateLogin';
import { AuthProvider, useAuth } from '../context/AuthLogin';
import ProtectedRoute from '../utils/ProtectedRoute';

const AppRouter: React.FC = () => {
  const { token } = useAuth();

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginComponent />} />
        {token ? (
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardCandidate />} />
          </Route>
        ) : (
          <Navigate to="/login" replace />
        )}
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
