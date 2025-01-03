import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "@/auth/RegisterForm";
import AdminDashboard from "@/components/admin/AdminDashboard";
import DeveloperDashboard from "@/components/developer/DeveloperDashboard";
import ManagerDashboard from "@/components/manager/ManagerDashboard";
import PrivateRoute from "@/components/PrivateRoute";
import RestrictedRoute from "@/components/RestrictedRoute";
import LoginForm from "@/auth/LoginForm";
export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RestrictedRoute>
            <LoginForm />
          </RestrictedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute>
            <LoginForm />
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
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/developer-dashboard"
        element={
          <PrivateRoute>
            <DeveloperDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager-dashboard"
        element={
          <PrivateRoute>
            <ManagerDashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
