import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute';
import DashboardCandidate from '../Pages/Candidateprofile/DashboardCandidate';
import Landing from '../Pages/LandingPage/Landing';
import LoginComponent from '../Pages/authentication/CandidateLogin';
import { AuthProvider } from '../context/AuthLogin';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path='' element={<Landing />} />
                <Route path='login' element={<LoginComponent />} />
                <Route element={<ProtectedRoute canActivate={false} />}>
                    <Route path='dashboard' element={<DashboardCandidate />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
