import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>VisionCare Charity</h2>
          <p>Providing quality eye care services for all. Our mission is to make vision accessible to everyone.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Treatments</li>
            <li>Doctors</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: visioncare@gmail.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: Nagpur, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 VisionCare Charity. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;