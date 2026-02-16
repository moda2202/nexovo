import { Link } from "react-router-dom";

export function AuthHeader() {
    return (
        <header className="topbar">
            <Link to="/" className="brand" style={{ textDecoration: "none" }}>
                <div className="logo">CV</div>
                <div>
                    <div className="brand-title">Firas CV</div>
                </div>
            </Link>

            <nav className="auth-topbar-nav">
                <Link to="/" className="nav-link">CV</Link>
                <Link to="/community" className="nav-link">Community</Link>
            </nav>
        </header>
    );
}
