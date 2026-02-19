import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { API_BASE } from "../config";
import { AuthHeader } from "../components/layout/AuthHeader";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        const data = await response.json();
        setError(data.errors?.[0]?.description || "Failed to reset password. The link might be expired.");
      }
    } catch (err) {
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div className="app">
        <AuthHeader />
        <div className="page-center">
          <div className="auth-card" style={{ textAlign: "center" }}>
            <h2 className="auth-title">Invalid Link ❌</h2>
            <p className="auth-subtitle">This password reset link is missing information.</p>
            <Link to="/forgot-password" className="auth-btn" style={{ display: "inline-block", marginTop: "20px", textDecoration: "none" }}>Request New Link</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <AuthHeader />
      <div className="page-center">
        <div className="auth-card">
          <h2 className="auth-title">New Password 🗝️</h2>
          <p className="auth-subtitle">Enter a new strong password for your account.</p>

          {error && <div className="auth-error">{error}</div>}
          {success && (
            <div className="auth-error" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              Password reset successful! Redirecting to login...
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="password"
                placeholder="New Password (min 6 characters)"
                className="auth-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : "Save Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}