import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import AuthModal from "../components/AuthModal";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleProtectedNavigate = (to) => {
    if (currentUser) {
      navigate(to);
      return;
    }
    setShowAuthModal(true);
  };

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Providing Quality <br />
            <br />
            <span>Eye Care</span> for Everyone
          </h1>

          <p>
            VisionCare Charity offers advanced eye treatments, free eye camps,
            and affordable surgeries to help everyone see a better world.
          </p>
            <div className="hero-buttons">
              <button className="btn filled" onClick={() => handleProtectedNavigate("/appointment")}>Book Appointment</button>
              <button className="btn outline" onClick={() => handleProtectedNavigate("/donate")}>Donate Now</button>
            </div>
         
        </div>

        <div className="hero-right">
          <img
            src="https://www.neovisioneyecenters.com/wp-content/uploads/2020/10/neovision-october-2020-1-jpg.webp"
            alt="doctor"
          />
        </div>
      </section>

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

export default Home;
