import "./Treatments.css";

function Treatments() {
  return (
    <div className="treatments-page">

      {/* HERO SECTION */}
      <section className="treatment-hero">

        <h1>Our Eye Care Treatments</h1>

        <p>
          We provide advanced and affordable eye care solutions
          using modern technology and experienced specialists.
        </p>

      </section>

      {/* TREATMENT CARDS */}
      <section className="treatment-cards">

        <div className="treatment-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
            alt="cataract"
          />

          <h2>Cataract Surgery</h2>

          <p>
            Safe and effective cataract removal surgery
            for clearer vision.
          </p>

        </div>

        <div className="treatment-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
            alt="lasik"
          />

          <h2>LASIK Surgery</h2>

          <p>
            Advanced laser treatment to correct
            vision problems permanently.
          </p>

        </div>

        <div className="treatment-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="retina"
          />

          <h2>Retina Treatment</h2>

          <p>
            Specialized retina care and treatment
            for retinal disorders.
          </p>

        </div>

        <div className="treatment-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4320/4320371.png"
            alt="child"
          />

          <h2>Pediatric Eye Care</h2>

          <p>
            Comprehensive eye checkups and treatment
            for children.
          </p>

        </div>

      </section>

      {/* WHY CHOOSE */}
      <section className="why-treatment">

        <h1>Why Choose VisionCare?</h1>

        <div className="why-boxes">

          <div className="why-box">
            <h3>Expert Doctors</h3>
            <p>Highly experienced ophthalmologists.</p>
          </div>

          <div className="why-box">
            <h3>Modern Equipment</h3>
            <p>Latest eye care technologies and machines.</p>
          </div>

          <div className="why-box">
            <h3>Affordable Care</h3>
            <p>Quality treatment at affordable cost.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Treatments;