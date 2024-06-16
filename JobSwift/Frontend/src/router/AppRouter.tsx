import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';

import LoginComponent from '../components/Auth/login';
import ProtectedRoute from '../utils/ProtectedRoute';
import DashboardCandidate from '../components/Candidate/DashboardCandidate';
import Landing from '../components/LandingPage/Landing';


const App: React.FC = () => {
    return (
            <Routes>
                <Route path='' element={<Landing />} />
                <Route path='login' element={<LoginComponent />} />
                <Route element={<ProtectedRoute canActivate={false} />}>
                    <Route path='dashboard' element={<DashboardCandidate />} />
                </Route>
            </Routes>
    );
}

export default App;
