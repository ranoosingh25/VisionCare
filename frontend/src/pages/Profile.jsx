import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("visioncareCurrentUser");
    sessionStorage.removeItem("visioncareCurrentUser");
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <h1>My Profile</h1>
        <p>Manage your account details and access dashboard features.</p>
      </section>

      <section className="profile-details">
        <div className="profile-card">
          <h2>Account Information</h2>
          <p>
            <strong>Name:</strong> {user.fullName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Member Since:</strong> {user.createdAt || "N/A"}
          </p>
          <button className="btn filled" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

export default Profile;
