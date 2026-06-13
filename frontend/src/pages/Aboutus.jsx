import "./Aboutus.css";

function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About VisionCare Charity</h1>

        <p>
          Dedicated to providing affordable and quality eye care services
          to every individual through advanced treatment and community support.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content">

        <div className="about-left">
          <img
            src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNhbCUyMHRlYW18ZW58MHx8MHx8fDA%3D"
            alt="hospital"
          />
        </div>

        <div className="about-right">
          <h2>Who We Are</h2>

          <p>
            VisionCare Charity is a trusted eye care organization committed
            to improving vision health through modern treatment facilities,
            experienced doctors, and free eye camps for underprivileged communities.
          </p>

          <p>
            Our mission is to ensure that everyone has access to proper eye care,
            regardless of financial condition.
          </p>
        </div>

      </section>

      {/* MISSION & VISION */}
      <section className="mission-section">

        <div className="mission-card">
          <h2>Our Mission</h2>

          <p>
            To provide accessible and affordable eye care services
            while spreading awareness about vision health.
          </p>
        </div>

        <div className="mission-card">
          <h2>Our Vision</h2>

          <p>
            A world where no one suffers from preventable blindness.
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="stats-section">

        <div className="stat-box">
          <h2>50,000+</h2>
          <p>Patients Treated</p>
        </div>

        <div className="stat-box">
          <h2>10,000+</h2>
          <p>Successful Surgeries</p>
        </div>

        <div className="stat-box">
          <h2>120+</h2>
          <p>Eye Camps Organized</p>
        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">

        <h1>Why Choose Us</h1>

        <div className="why-cards">

          <div className="why-card">
            <h3>Expert Doctors</h3>
            <p>Highly experienced eye specialists.</p>
          </div>

          <div className="why-card">
            <h3>Affordable Care</h3>
            <p>Quality treatment at minimal cost.</p>
          </div>

          <div className="why-card">
            <h3>Modern Technology</h3>
            <p>Advanced eye care equipment and surgeries.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;