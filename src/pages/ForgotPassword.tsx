import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../config";
import { AuthHeader } from "../components/layout/AuthHeader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || "If your email is in our system, a password reset link has been sent.");
    } catch (error) {
      setMessage("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <AuthHeader />
      <div className="page-center">
        <div className="auth-card">
          <h2 className="auth-title">Reset Password 🔐</h2>
          <p className="auth-subtitle" style={{ marginBottom: '20px' }}>
            Enter your email and we'll send you a link to reset your password.
          </p>

          {message && (
            <div className="auth-error" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email address"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="auth-spinner"></span> : "Send Reset Link"}
            </button>
          </form>

          <p className="auth-footer">
            Remember your password? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}