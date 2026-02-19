import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// RequireAuth still available for other protected routes if needed
import CommunityPage from "./pages/CommunityPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import { MoneyManagerPage } from "./pages/MoneyManagerPage";
import { RequireAuth } from "./routes/RequireAuth";
import { MonthDetailsPage } from "./pages/MonthDetailsPage";
import  ForgotPassword  from "./pages/ForgotPassword";
import  ResetPassword  from "./pages/ResetPassword";

export default function App() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <AuthProvider>
      <Router basename={baseUrl}>
        <Routes>
          <Route path="/" element={<CommunityPage />} />

          <Route path="/cv" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/money-manager"
            element={
              <RequireAuth>
                <MoneyManagerPage />
              </RequireAuth>
            }
          />
          <Route
            path="/money-manager/:id"
            element={
              <RequireAuth>
                <MonthDetailsPage />
              </RequireAuth>
            }
          />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}