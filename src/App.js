import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import LeadDetails from './pages/LeadDetails';
import Leads from './pages/Leads';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/leads" element={<PrivateRoute><Leads /></PrivateRoute>} />
        <Route path="/leads/:id" element={<PrivateRoute><LeadDetails /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#4caf50',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#f44336',
            },
          },
        }}
      />
    </>
  );
}

export default App;