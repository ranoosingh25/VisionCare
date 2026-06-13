import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import AuthModal from "./AuthModal";
import { getCurrentUser, isAuthenticated } from "../utils/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location]);

  const handleProtectedNavigate = (to) => {
    if (isAuthenticated()) {
      navigate(to);
      return;
    }
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("visioncareCurrentUser");
    sessionStorage.removeItem("visioncareCurrentUser");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>VisionCare Charity</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/treatments">Treatments</Link></li>
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>

      <div className="nav-buttons">
        {currentUser ? (
          <>
            <Link to="/profile" className="profile-icon-link" title="Profile">
              <FaUser className="profile-icon" />
            </Link>
            <button type="button" className="btn outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn filled">Login</button>
          </Link>
        )}

        <button type="button" className="btn outline" onClick={() => handleProtectedNavigate("/donate")}>Donate</button>
        <button type="button" className="btn filled" onClick={() => handleProtectedNavigate("/appointment")}>Book Appointment</button>
      </div>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
}

export default Navbar;