import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import AuthModal from "../components/AuthModal";
import "./Doctors.css";

function Doctors() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const seededDoctors = [
    {
      id: "seed-1",
      fullName: "Dr. Raj Sharma",
      specialty: "Cataract Specialist",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "12+ years of experience in cataract and vision correction surgeries.",
    },
    {
      id: "seed-2",
      fullName: "Dr. Priya Mehta",
      specialty: "LASIK Expert",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Expert in modern LASIK treatments and laser eye surgeries.",
    },
    {
      id: "seed-3",
      fullName: "Dr. Ahmed Khan",
      specialty: "Retina Specialist",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Specialized in retina diseases and advanced retina surgeries.",
    },
    {
      id: "seed-4",
      fullName: "Dr. Suresh Patel",
      specialty: "Glaucoma Specialist",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      bio: "Experienced glaucoma specialist focusing on minimally invasive treatments.",
    },
    {
      id: "seed-5",
      fullName: "Dr. Kavita Rao",
      specialty: "Oculoplastic Surgeon",
      image: "https://randomuser.me/api/portraits/women/30.jpg",
      bio: "Specialist in oculoplastic and reconstructive eyelid surgery.",
    },
    {
      id: "seed-6",
      fullName: "Dr. Neha Verma",
      specialty: "Pediatric Ophthalmologist",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Child eye care specialist with expertise in pediatric treatments.",
    },
  ];

  const loadDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      const fetched = data.doctors || [];
      // merge fetched with seededDoctors to ensure at least the seeded list appears
      const names = new Set(fetched.map((d) => (d.fullName || "").toLowerCase()));
      const merged = [...fetched];
      seededDoctors.forEach((s) => {
        if (!names.has((s.fullName || "").toLowerCase())) merged.push(s);
      });
      setDoctors(merged.slice(0, Math.max(6, merged.length)));
    } catch (e) {
      // fallback to seeded list on error
      setDoctors(seededDoctors);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleAppointmentClick = (doc) => {
    if (currentUser) {
      // navigate to appointment and pass selected doctor id and name
      navigate("/appointment", { state: { doctorId: doc.id, doctorName: doc.fullName } });
      return;
    }
    setShowAuthModal(true);
  };

  return (
    <div className="doctors-page">

      {/* HERO SECTION */}
      <section className="doctor-hero">

        <h1>Meet Our Specialists</h1>

        <p>
          Our experienced eye specialists are dedicated
          to providing the best vision care services.
        </p>

      </section>

      {/* DOCTORS SECTION */}
      <section className="doctor-cards">
        {doctors.length === 0 ? (
          <p>No doctors available yet.</p>
        ) : (
          doctors.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <img src={doc.image || "https://images.unsplash.com/photo-1551601651-2a6f0b3d9a3b"} alt={doc.fullName} />
              <h2>{doc.fullName}</h2>
              <h4>{doc.specialty}</h4>
              <p>{doc.bio || "—"}</p>
              <button type="button" onClick={() => handleAppointmentClick(doc)}>Book Appointment</button>
            </div>
          ))
        )}
      </section>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

    </div>
  );
}

export default Doctors;