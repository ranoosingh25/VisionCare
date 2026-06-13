import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

function AuthModal({ open, onClose, message }) {
  const navigate = useNavigate();

  if (!open) {
    return null;
  }

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/login?mode=register");
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Login Required</h2>
        <p>
          {message ||
            "Please login to continue. You must be logged in to book appointments, participate in events, or register for eye donation."}
        </p>
        <div className="auth-modal-actions">
          <button className="btn outline" type="button" onClick={handleLogin}>
            Login
          </button>
          <button className="btn filled" type="button" onClick={handleRegister}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
