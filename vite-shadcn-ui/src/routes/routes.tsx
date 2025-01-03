import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from '@/auth/RegisterForm';
import AdminDashboard from '@/components/admin/AdminDashboard';
import DeveloperDashboard from '@/components/developer/DeveloperDashboard';
import ManagerDashboard from '@/components/manager/ManagerDashboard';
import PrivateRoute from '@/components/PrivateRoute';
import RestrictedRoute from '@/components/RestrictedRoute';
import Layout from '@/components/app/layouts';
import AuthenticationPage from '@/components/page';
import LoginForm from '@/auth/LoginForm';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Restricted routes */}
      <Route
        path="/"
        element={
          <RestrictedRoute>
            {/* <LoginForm /> */}
            <div className="grid grid-cols-1 justify-content-center">
              <div className="flex items-center justify-center">

            <AuthenticationPage/>
              </div>
            </div>
          </RestrictedRoute>
        }
      /><Route
        path="/login"
        element={
          <RestrictedRoute>
            <LoginForm />
            {/* <AuthenticationPage/> */}
          </RestrictedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <RestrictedRoute>
            <RegisterForm />
          </RestrictedRoute>
        }
      />

      {/* Protected routes with Layout */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/developer-dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DeveloperDashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manager-dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <ManagerDashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Redirect to login by default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
