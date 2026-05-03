import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Analytics from './pages/Analytics'
import ActivityTimeline from './pages/ActivityTimeline'

// Protected route wrapper
const ProtectedRoute = ({ children, title }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <MainLayout title={title}>{children}</MainLayout>;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute title="Dashboard"><Dashboard /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute title="Projects"><Projects /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute title="Analytics"><Analytics /></ProtectedRoute>} />
      <Route path="/activity" element={<ProtectedRoute title="Activity Log"><ActivityTimeline /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute title="Settings"><div className="p-8 text-on-surface-variant">Settings Content</div></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute title="Support"><div className="p-8 text-on-surface-variant">Support Content</div></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
